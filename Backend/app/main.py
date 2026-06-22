from fastapi import FastAPI

from app.database.connection import engine
from app.database.connection import Base

from app.database import base

from app.routes.product_routes import router as product_router
from app.routes.console_routes import router as console_router
from app.routes.rate_routes import router as rate_router
from app.routes.session_routes import router as session_router

app = FastAPI()

Base.metadata.create_all(bind=engine)


app.include_router(product_router)
app.include_router(console_router)
app.include_router(rate_router)
app.include_router(session_router)

@app.get("/")
def root():
    return {"message": "Cyber Management API running"}