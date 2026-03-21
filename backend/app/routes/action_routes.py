# from fastapi import APIRouter
# from bson import ObjectId

# from app.models.action import ActionUpdate
# from app.database.mongo import actions_collection

# router = APIRouter()


# @router.get("/")
# def get_actions(owner: str = "", status: str = ""):
#     query = {}

#     if owner:
#         query["owner"] = owner
#     if status:
#         query["status"] = status

#     actions = list(actions_collection.find(query))

#     for a in actions:
#         a["_id"] = str(a["_id"])

#     return actions


# @router.patch("/{action_id}")
# def update(action_id: str, update: ActionUpdate):
#     update_data = {k: v for k, v in update.dict().items() if v is not None}

#     actions_collection.update_one(
#         {"_id": ObjectId(action_id)},
#         {"$set": update_data}
#     )

#     return {"message": "Updated"}







from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.models.action import ActionUpdate
from app.database.mongo import actions_collection
from app.utils.dependencies import get_current_user  # ✅ NEW

router = APIRouter()


# ✅ GET ACTIONS (USER-SCOPED + FILTERS)
@router.get("/")
def get_actions(
    owner: str = "",
    status: str = "",
    user_id: str = Depends(get_current_user)  # ✅ AUTH
):
    query = {"user_id": user_id}  # ✅ ALWAYS filter by user

    if owner:
        query["owner"] = owner
    if status:
        query["status"] = status

    actions = list(actions_collection.find(query))

    for a in actions:
        a["_id"] = str(a["_id"])

    return actions


# ✅ UPDATE ACTION (SECURED)
@router.patch("/{action_id}")
def update(
    action_id: str,
    update: ActionUpdate,
    user_id: str = Depends(get_current_user)  # ✅ AUTH
):
    update_data = {k: v for k, v in update.dict().items() if v is not None}

    result = actions_collection.update_one(
        {
            "_id": ObjectId(action_id),
            "user_id": user_id   # ✅ SECURITY CHECK
        },
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Action not found")

    return {"message": "Updated successfully"}