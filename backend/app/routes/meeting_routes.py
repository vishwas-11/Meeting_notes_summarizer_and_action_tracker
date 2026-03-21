# from fastapi import APIRouter, HTTPException, UploadFile, File
# from bson import ObjectId
# from datetime import datetime

# from app.models.meeting import MeetingCreate
# from app.services.meeting_service import create_meeting, process_meeting
# from app.database.mongo import meetings_collection

# from app.utils.dependencies import get_current_user
# from fastapi import Depends

# from app.utils.text_splitter import split_text
# from app.vector_store import store_chunks

# router = APIRouter()


# @router.post("/create")
# def create(data: MeetingCreate):
#     meeting = {
#         "title": data.title,
#         "type": data.type,                 
#         "source": "Manual",               
#         "participants": data.participants,
#         "notes": data.notes,
#         "created_at": datetime.utcnow()   
#     }

#     meeting_id = create_meeting(meeting)
#     return {"meeting_id": meeting_id}



# @router.post("/process/{meeting_id}")
# def process(meeting_id: str):
#     result = process_meeting(meeting_id)

#     if not result:
#         raise HTTPException(status_code=404, detail="Meeting not found")

#     return result



# @router.get("/")
# def get_all():
#     meetings = list(meetings_collection.find())

#     for m in meetings:
#         m["_id"] = str(m["_id"])

#     return meetings



# @router.get("/{meeting_id}")
# def get_one(meeting_id: str):
#     meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

#     if not meeting:
#         raise HTTPException(status_code=404, detail="Meeting not found")

#     meeting["_id"] = str(meeting["_id"])
#     return meeting



# @router.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         # ✅ Read file
#         content = await file.read()
#         text = content.decode("utf-8")

#         # ✅ Store meeting in MongoDB
#         meeting = {
#             "title": file.filename,
#             "type": "File Upload",         
#             "source": "Uploaded",          
#             "participants": [],
#             "notes": text,
#             "created_at": datetime.utcnow()  
#         }

#         result = meetings_collection.insert_one(meeting)
#         meeting_id = str(result.inserted_id)

#         #  RAG PIPELINE
#         chunks = split_text(text)
#         store_chunks(chunks, meeting_id)

#         return {"meeting_id": meeting_id}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))






# from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
# from bson import ObjectId
# from datetime import datetime

# from app.models.meeting import MeetingCreate
# from app.services.meeting_service import create_meeting, process_meeting
# from app.database.mongo import meetings_collection, actions_collection  # add actions_collection

# from app.utils.dependencies import get_current_user  # NEW IMPORT
# from app.utils.text_splitter import split_text
# from app.vector_store import store_chunks

# router = APIRouter()


# # ✅ MODIFIED: Added user_id via Depends
# @router.post("/create")
# def create(data: MeetingCreate, user_id: str = Depends(get_current_user)):
#     meeting = {
#         "title": data.title,
#         "type": data.type,
#         "source": "Manual",
#         "participants": data.participants,
#         "notes": data.notes,
#         "user_id": user_id,              # ✅ NEW: attach user to meeting
#         "created_at": datetime.utcnow()
#     }

#     meeting_id = create_meeting(meeting)
#     return {"meeting_id": meeting_id}


# @router.post("/process/{meeting_id}")
# def process(meeting_id: str):
#     result = process_meeting(meeting_id)

#     if not result:
#         raise HTTPException(status_code=404, detail="Meeting not found")

#     return result


# # ✅ MODIFIED: Filter meetings by user_id
# @router.get("/")
# def get_meetings(user_id: str = Depends(get_current_user)):
#     meetings = list(meetings_collection.find({"user_id": user_id}))

#     for m in meetings:
#         m["_id"] = str(m["_id"])

#     return meetings


# @router.get("/{meeting_id}")
# def get_one(meeting_id: str):
#     meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

#     if not meeting:
#         raise HTTPException(status_code=404, detail="Meeting not found")

#     meeting["_id"] = str(meeting["_id"])
#     return meeting


# @router.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     try:
#         content = await file.read()
#         text = content.decode("utf-8")

#         meeting = {
#             "title": file.filename,
#             "type": "File Upload",
#             "source": "Uploaded",
#             "participants": [],
#             "notes": text,
#             "created_at": datetime.utcnow()
#         }

#         result = meetings_collection.insert_one(meeting)
#         meeting_id = str(result.inserted_id)

#         chunks = split_text(text)
#         store_chunks(chunks, meeting_id)

#         return {"meeting_id": meeting_id}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# # NEW ROUTE: Get actions filtered by user
# @router.get("/actions/")
# def get_actions(user_id: str = Depends(get_current_user)):
#     return list(actions_collection.find({"user_id": user_id}))






from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from bson import ObjectId
from datetime import datetime

from app.models.meeting import MeetingCreate
from app.services.meeting_service import create_meeting, process_meeting
from app.database.mongo import meetings_collection, actions_collection

from app.utils.dependencies import get_current_user
from app.utils.text_splitter import split_text
from app.vector_store import store_chunks

router = APIRouter()


# ✅ CREATE meeting (with user_id)
@router.post("/create")
def create(data: MeetingCreate, user_id: str = Depends(get_current_user)):
    meeting = {
        "title": data.title,
        "type": data.type,
        "source": "Manual",
        "participants": data.participants,
        "notes": data.notes,
        "user_id": user_id,
        "created_at": datetime.utcnow()
    }

    meeting_id = create_meeting(meeting, user_id)
    return {"meeting_id": meeting_id}


# ✅ PROCESS meeting (SECURED)
@router.post("/process/{meeting_id}")
def process(meeting_id: str, user_id: str = Depends(get_current_user)):
    meeting = meetings_collection.find_one({
        "_id": ObjectId(meeting_id),
        "user_id": user_id
    })

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return process_meeting(meeting_id, user_id)


# ✅ GET ALL meetings (filtered)
@router.get("/")
def get_meetings(user_id: str = Depends(get_current_user)):
    meetings = list(meetings_collection.find({"user_id": user_id}))

    for m in meetings:
        m["_id"] = str(m["_id"])

    return meetings


# ✅ GET ONE meeting (SECURED)
@router.get("/{meeting_id}")
def get_one(meeting_id: str, user_id: str = Depends(get_current_user)):
    meeting = meetings_collection.find_one({
        "_id": ObjectId(meeting_id),
        "user_id": user_id
    })

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    meeting["_id"] = str(meeting["_id"])
    return meeting


# ✅ UPLOAD meeting (NOW USER-SCOPED)
@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user)
):
    try:
        content = await file.read()
        text = content.decode("utf-8")

        meeting = {
            "title": file.filename,
            "type": "File Upload",
            "source": "Uploaded",
            "participants": [],
            "notes": text,
            "user_id": user_id,   # ✅ FIXED
            "created_at": datetime.utcnow()
        }

        result = meetings_collection.insert_one(meeting)
        meeting_id = str(result.inserted_id)

        chunks = split_text(text)
        store_chunks(chunks, meeting_id)

        return {"meeting_id": meeting_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ GET ACTIONS (USER FILTERED + FIXED ID)
@router.get("/actions/")
def get_actions(user_id: str = Depends(get_current_user)):
    actions = list(actions_collection.find({"user_id": user_id}))

    for a in actions:
        a["_id"] = str(a["_id"])

    return actions