from sqlalchemy.orm import Session
from fastapi import HTTPException

from datetime import datetime

from app.models.session import Session
from app.schemas.session import SessionCreate

from app.models.console import Console
from app.models.rate import Rate

def start_session(db:Session, session_data: SessionCreate):

    #"Busco consola"
    console = db.query(Console).filter(
        Console.id == session_data.console_id
    ).first()

    #"Verifico que exista"
    if console is None:
        return None

    #"Verifico disponibilidad"
    if console.status != "Disponible":
        raise HTTPException(
            status_code=400,
            detail="La consola se encuentra ocupada"
        )
    
    #Buscar tarifa
    tarifa = db.query(Rate).filter(
        Rate.players_count == session_data.players_count,
        Rate.active == True
    ).first()

    if tarifa is None:
        raise HTTPException(
            status_code=404,
            detail="No existe una tarifa para esa cantidad de jugadores"
        )

    #Crear Session
    new_session = Session(
        console_id = console.id,
        rate_id = tarifa.id,
        players_count = session_data.players_count,
        start_time = datetime.now(),
        total_price = 0,
        active = True
    )

    console.status = "Ocupada"

    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    return new_session

def end_session(db:Session, session_id: int):

    #Busco Session
    session = db.query(Session).filter(
        Session.id == session_id,
        Session.active == True
    ).first()

    if session is None:
        return None
    
    end_time = datetime.now()

    duration_hours = (
        end_time - session.start_time
    ).total_seconds() / 3600

    #Busco tarifa
    tarifa = db.query(Rate).filter(
        Rate.id == session.rate_id
    ).first()

    total = round (duration_hours * tarifa.price_per_hour,2)

    #Actualizo Session
    session.end_time = end_time
    session.total_price = total
    session.active = False

    #Libero Consola
    console = db.query(Console).filter(
        Console.id == session.console_id
    ).first()
    console.status = "Disponible"

    db.commit()
    db.refresh(session)

    return session

def get_sessions(db: Session):
    sessions = db.query(Session).all()
    return sessions

def get_sessions_active(db: Session):
    sessions = db.query(Session).filter(Session.active == True).all()
    return sessions







