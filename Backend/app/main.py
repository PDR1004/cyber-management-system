from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import engine
from app.database.connection import Base

from app.database import base

from app.routes.product_routes import router as product_router
from app.routes.console_routes import router as console_router
from app.routes.rate_routes import router as rate_router
from app.routes.session_routes import router as session_router
from app.routes.sale_routes import router as sale_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(product_router)
app.include_router(console_router)
app.include_router(rate_router)
app.include_router(session_router)
app.include_router(sale_router)

@app.get("/")
def root():
    return {"message": "Cyber Management API running"}