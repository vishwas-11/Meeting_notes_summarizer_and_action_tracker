from datetime import datetime
from bson import ObjectId

from app.database.mongo import meetings_collection, actions_collection
from app.services.llm_service import process_notes

from app.utils.text_splitter import split_text
from app.vector_store import store_chunks


def create_meeting(data: dict):
    data["created_at"] = datetime.utcnow()

    #  Insert into MongoDB
    result = meetings_collection.insert_one(data)
    meeting_id = str(result.inserted_id)

    #  RAG: store embeddings (chunk-based)
    if "notes" in data and data["notes"]:
        chunks = split_text(data["notes"])
        store_chunks(chunks, meeting_id)

    return meeting_id



def process_meeting(meeting_id: str):
    meeting = meetings_collection.find_one({"_id": ObjectId(meeting_id)})

    if not meeting:
        return None

    #  Ensure embeddings exist (important if uploaded via file route)
    if meeting.get("notes"):
        chunks = split_text(meeting["notes"])
        store_chunks(chunks, meeting_id)

    #  LLM processing
    parsed, raw = process_notes(meeting["notes"])

    # DEBUG logs
    print("RAW LLM:", raw)
    print("PARSED:", parsed)

    #  Update meeting
    meetings_collection.update_one(
        {"_id": ObjectId(meeting_id)},
        {
            "$set": {
                "summary": parsed.get("summary", ""),
                "decisions": parsed.get("decisions", []),
                "raw_llm_output": str(raw)
            }
        }
    )

    #  Insert action items
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

    #  Return clean response
    return {
        "summary": parsed.get("summary", ""),
        "decisions": parsed.get("decisions", []),
        "action_items": parsed.get("action_items", [])
    }