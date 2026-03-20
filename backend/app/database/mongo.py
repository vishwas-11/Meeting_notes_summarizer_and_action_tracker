from pymongo import MongoClient
from app.config.settings import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

meetings_collection = db["meetings"]
actions_collection = db["action_items"]
users_collection = db["users"]

# Indexes (IMPORTANT)
meetings_collection.create_index("created_at")
actions_collection.create_index("meeting_id")
actions_collection.create_index("owner")
actions_collection.create_index("status")