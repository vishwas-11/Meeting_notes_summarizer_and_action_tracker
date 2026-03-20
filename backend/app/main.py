from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import meeting_routes, action_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meeting_routes.router, prefix="/meetings")
app.include_router(action_routes.router, prefix="/actions")


@app.get("/")
def root():
    return {"message": "AI Meeting Notes API Running"}