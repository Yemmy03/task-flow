from fastapi import FastAPI
from .database import Base, engine
from .routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow API")

@app.get("/health")
def health():
    return {"status": "ok"}

app.include_router(router)
