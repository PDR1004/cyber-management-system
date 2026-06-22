from sqlalchemy.orm import Session

from app.models.console import Console
from app.schemas.console import ConsoleCreate

def create_console(db: Session, console_data: ConsoleCreate):
    new_console = Console(
        name=console_data.name,
    )

    db.add(new_console)
    db.commit()
    db.refresh(new_console)

    return new_console

def get_consoles(db: Session):
    consoles = db.query(Console).all()
    return consoles