from datetime import datetime
from bson import ObjectId

from app.database.mongo import meetings_collection, actions_collection
from app.services.llm_service import process_notes


def create_meeting(data: dict):
    data["created_at"] = datetime.utcnow()
    result = meetings_collection.insert_one(data)
    return str(result.inserted_id)


def process_meeting(meeting_id: str):
    meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

    if not meeting:
        return None

    parsed, raw = process_notes(meeting["notes"])

    meetings_collection.update_one(
        {"_id": ObjectId(meeting_id)},
        {
            "$set": {
                "summary": parsed.get("summary"),
                "decisions": parsed.get("decisions"),
                "raw_llm_output": raw
            }
        }
    )

    for action in parsed.get("action_items", []):
        action["meeting_id"] = meeting_id
        action["status"] = "Pending"
        actions_collection.insert_one(action)

    return parsed