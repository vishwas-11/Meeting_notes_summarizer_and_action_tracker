from fastapi import APIRouter
from bson import ObjectId

from app.models.action import ActionUpdate
from app.database.mongo import actions_collection

router = APIRouter()


@router.get("/")
def get_actions():
    actions = list(actions_collection.find())

    for a in actions:
        a["_id"] = str(a["_id"])

    return actions


@router.patch("/{action_id}")
def update(action_id: str, update: ActionUpdate):
    update_data = {k: v for k, v in update.dict().items() if v is not None}

    actions_collection.update_one(
        {"_id": ObjectId(action_id)},
        {"$set": update_data}
    )

    return {"message": "Updated"}