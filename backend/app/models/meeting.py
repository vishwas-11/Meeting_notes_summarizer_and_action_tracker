from pydantic import BaseModel
from typing import List

class MeetingCreate(BaseModel):
    title: str
    type: str
    participants: List[str]
    notes: str