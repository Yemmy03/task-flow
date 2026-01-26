from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from .database import SessionLocal
from .models import Task
from .schemas import TaskCreate, TaskUpdate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@router.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.put("/tasks/{task_id}")
def update_task(task_id: UUID, task: TaskUpdate, db: Session = Depends(get_db)):
    existing = db.query(Task).filter(Task.id == task_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")

    existing.status = task.status
    db.commit()
    return existing

@router.delete("/tasks/{task_id}")
def delete_task(task_id: UUID, db: Session = Depends(get_db)):
    existing = db.query(Task).filter(Task.id == task_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(existing)
    db.commit()
    return {"message": "Task deleted"}
