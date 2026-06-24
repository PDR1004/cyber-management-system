from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi import HTTPException

from app.database.dependencies import get_db

import app.schemas.console as console_schemas
from app.services.console_service import create_console, get_consoles, get_console_id, update_console, delete_console

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

@router.get("/{console_id}", response_model=console_schemas.ConsoleResponse)
def read_console(
    console_id: int,
    db: Session = Depends(get_db)
):
    console = get_console_id(db,console_id)

    if console is None:
        raise HTTPException(
            status_code=404, 
            detail="Console not found")
    return console

@router.put("/{console_id}", response_model=console_schemas.ConsoleResponse)
def update_console_by_id(
    console_id: int,
    console_data: console_schemas.ConsoleUpdate,
    db: Session = Depends(get_db)
):
    console = update_console(db, console_id, console_data)

    if console is None:
        raise HTTPException(
            status_code=404,
            detail="Console not found"
        )
    return console

@router.delete("/{console_id}", response_model=console_schemas.ConsoleResponse)
def delete_console_by_id(
    console_id: int,
    db: Session = Depends(get_db)
):
    console = delete_console(db, console_id)
    
    if console is None:
        raise HTTPException(
            status_code=404,
            detail="Console not found"
        )
    return console