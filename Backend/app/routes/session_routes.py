from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.dependencies import get_db

from app.schemas.session import SessionCreate, SessionResponse

from app.services.session_service import start_session, end_session, get_sessions, get_sessions_active

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)

@router.post("/start", response_model=SessionResponse, status_code=status.HTTP_201_CREATED)
def create_new_session(
    session_data: SessionCreate,
    db: Session = Depends(get_db)
):

    try:
        return start_session(db, session_data)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )

@router.post ("/{session_id}/end", response_model=SessionResponse)
def finish_session(session_id: int, db: Session = Depends(get_db)):
    session = end_session(db, session_id)

    if session is None:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Session not found"
        )
    return session

@router.get ("/", response_model=List[SessionResponse])
def read_sessions (db: Session = Depends(get_db)):
    return get_sessions(db)

@router.get ("/active/", response_model=List[SessionResponse])
def read_active_sessions (db: Session = Depends(get_db)):
    return get_sessions_active(db)