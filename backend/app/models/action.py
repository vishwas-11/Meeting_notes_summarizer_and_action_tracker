from pydantic import BaseModel
from typing import Optional

class ActionUpdate(BaseModel):
    status: Optional[str] = None
    owner: Optional[str] = None
    deadline: Optional[str] = None