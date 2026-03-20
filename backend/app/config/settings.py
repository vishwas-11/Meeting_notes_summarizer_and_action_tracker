import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI = os.getenv("MONGO_URI")
    DB_NAME = os.getenv("DB_NAME")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

settings = Settings()

if not settings.MONGO_URI or not settings.DB_NAME:
    raise Exception("Missing MongoDB configuration")