from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.models.meeting import MeetingCreate
from app.services.meeting_service import create_meeting, process_meeting
from app.database.mongo import meetings_collection

router = APIRouter()


@router.post("/create")
def create(meeting: MeetingCreate):
    meeting_id = create_meeting(meeting.dict())
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