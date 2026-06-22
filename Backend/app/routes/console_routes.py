from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi import HTTPException

from app.database.dependencies import get_db

import app.schemas.console as console_schemas
from app.services.console_service import create_console, get_consoles

router = APIRouter(
    prefix="/consoles",
    tags=["Consoles"]
)

@router.post("/",response_model=console_schemas.ConsoleResponse)
def create_new_console(
    console: console_schemas.ConsoleCreate,
    db: Session = Depends(get_db)
):
    return create_console(db, console)  

@router.get("/", response_model=List[console_schemas.ConsoleResponse])
def read_consoles(
    db: Session = Depends(get_db)
):
    return get_consoles(db)