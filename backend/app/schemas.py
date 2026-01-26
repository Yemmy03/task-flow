from pydantic import BaseModel, validator
from uuid import UUID
from datetime import datetime

ALLOWED_STATUSES = {"pending", "in_progress", "done"}

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    status: str

    @validator("status")
    def validate_status(cls, v):
        if v not in ALLOWED_STATUSES:
            raise ValueError(f"Invalid status. Allowed: {ALLOWED_STATUSES}")
        return v

class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: str | None
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
