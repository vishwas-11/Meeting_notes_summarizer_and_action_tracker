from datetime import datetime
from bson import ObjectId

from app.database.mongo import meetings_collection, actions_collection
from app.services.llm_service import process_notes
from app.vector_store import vector_store


def create_meeting(data: dict):
    data["created_at"] = datetime.utcnow()
    result = meetings_collection.insert_one(data)
    vector_store.add_texts(
        texts=[data["notes"]],
        metadatas=[{"meeting_id": str(result.inserted_id)}]
    )

    return str(result.inserted_id)


def process_meeting(meeting_id: str):
    meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

    if not meeting:
        return None

    parsed, raw = process_notes(meeting["notes"])

    #  DEBUG (important)
    print("RAW LLM:", raw)
    print("PARSED:", parsed)

    # Update meeting
    meetings_collection.update_one(
        {"_id": ObjectId(meeting_id)},
        {
            "$set": {
                "summary": parsed.get("summary", ""),
                "decisions": parsed.get("decisions", []),
                "raw_llm_output": str(raw)   # force string
            }
        }
    )

    # Insert actions safely
    for action in parsed.get("action_items", []):
        cleaned_action = {
            "task": action.get("task"),
            "owner": action.get("owner"),
            "priority": action.get("priority"),
            "deadline": action.get("deadline"),
            "meeting_id": meeting_id,
            "status": "Pending",
            "created_at": datetime.utcnow()
        }

        actions_collection.insert_one(cleaned_action)

    #  ALWAYS RETURN PURE JSON
    return {
        "summary": parsed.get("summary", ""),
        "decisions": parsed.get("decisions", []),
        "action_items": parsed.get("action_items", [])
    }