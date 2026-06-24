from sqlalchemy.orm import Session

from app.models.console import Console
from app.schemas.console import ConsoleCreate, ConsoleUpdate

def create_console(db: Session, console_data: ConsoleCreate):
    new_console = Console(
        name=console_data.name,
    )

    db.add(new_console)
    db.commit()
    db.refresh(new_console)

    return new_console

def get_consoles(db: Session):
    consoles = db.query(Console).filter(
        Console.status != "Inactivo"
    ).all()
    return consoles

def get_console_id(db: Session, console_id: int):
    console = db.query(Console).filter(
        Console.id == console_id,
        Console.status != "Inactivo"
    ).first()
    return console

def update_console(db: Session, console_id: int, console_data: ConsoleUpdate):
    console = db.query(Console).filter(
        Console.id == console_id
        ).first()

    if console is None:
        return None
    
    console.name = console_data.name
    console.status = console_data.status

    db.commit()
    db.refresh(console)
    return console

def delete_console(db: Session, console_id: int):
    console = db.query(Console).filter(
        Console.id == console_id
    ).first()

    if console is None:
        return None

    console.status = "Inactivo"

    db.commit()
    db.refresh(console)
    return console
