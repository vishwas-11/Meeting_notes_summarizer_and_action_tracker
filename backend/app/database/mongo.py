from pymongo import MongoClient
from app.config.settings import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

meetings_collection = db["meetings"]
actions_collection = db["action_items"]
user_collection = db["users"]