from fastapi import APIRouter, HTTPException
from app.database.mongo import db
from app.models.user import UserCreate, UserLogin
from app.utils.auth import hash_password, verify_password, create_access_token

router = APIRouter()

users = db["users"]

@router.post("/signup")
def signup(user: UserCreate):
    email = user.email.strip().lower()

    if users.find_one({"email": email}):
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    users.insert_one({
        "email": email,
        "password": hashed
    })

    return {"message": "User created"}

@router.post("/login")
def login(user: UserLogin):
    email = user.email.strip().lower()
    db_user = users.find_one({"email": email})

    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": str(db_user["_id"])})

    return {"access_token": token}