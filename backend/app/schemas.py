from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    status: str

class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: str | None
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
