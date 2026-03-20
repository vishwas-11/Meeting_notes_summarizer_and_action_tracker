from fastapi import APIRouter, HTTPException, UploadFile, File
from bson import ObjectId
from datetime import datetime

from app.models.meeting import MeetingCreate
from app.services.meeting_service import create_meeting, process_meeting
from app.database.mongo import meetings_collection

# ✅ RAG imports
from app.utils.text_splitter import split_text
from app.vector_store import store_chunks

router = APIRouter()


@router.post("/create")
def create(data: MeetingCreate):
    meeting = {
        "title": data.title,
        "type": data.type,                 
        "source": "Manual",               
        "participants": data.participants,
        "notes": data.notes,
        "created_at": datetime.utcnow()   
    }

    meeting_id = create_meeting(meeting)
    return {"meeting_id": meeting_id}



@router.post("/process/{meeting_id}")
def process(meeting_id: str):
    result = process_meeting(meeting_id)

    if not result:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return result



@router.get("/")
def get_all():
    meetings = list(meetings_collection.find())

    for m in meetings:
        m["_id"] = str(m["_id"])

    return meetings



@router.get("/{meeting_id}")
def get_one(meeting_id: str):
    meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting["_id"] = str(meeting["_id"])
    return meeting



@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # ✅ Read file
        content = await file.read()
        text = content.decode("utf-8")

        # ✅ Store meeting in MongoDB
        meeting = {
            "title": file.filename,
            "type": "File Upload",         
            "source": "Uploaded",          
            "participants": [],
            "notes": text,
            "created_at": datetime.utcnow()  
        }

        result = meetings_collection.insert_one(meeting)
        meeting_id = str(result.inserted_id)

        #  RAG PIPELINE
        chunks = split_text(text)
        store_chunks(chunks, meeting_id)

        return {"meeting_id": meeting_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))