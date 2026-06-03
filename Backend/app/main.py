from fastapi import FastAPI

from app.database.connection import engine
from app.database.connection import Base

from app.database import base

from app.routes.product_routes import router as product_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(product_router)

@app.get("/")
def root():
    return {"message": "Cyber Management API running"}