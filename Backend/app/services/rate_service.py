from sqlalchemy.orm import Session

from app.models.rate import Rate
from app.schemas.rate import RateCreate, RateUpdate

def create_rate(db: Session, rate_data: RateCreate):
    new_rate = Rate(
        players_count=rate_data.players_count,
        price_per_hour=rate_data.price_per_hour
    )

    db.add(new_rate)
    db.commit()
    db.refresh(new_rate)

    return new_rate

def get_rates(db:Session):
    rates = db.query(Rate).filter(Rate.active == True).all()
    return rates

def get_rate_by_id(rate_id:int, db: Session):
    rate = db.query(Rate).filter(
        Rate.id == rate_id,
        Rate.active == True
    ).first()
    return rate

def update_rate (rate_id: int, rate_data: RateUpdate, db: Session):
    rate = db.query(Rate).filter(
        Rate.id == rate_id,
        Rate.active == True
    ).first()

    if rate is None:
        return None

    rate.player_count = rate_data.players_count
    rate.price_per_hour = rate_data.price_per_hour

    db.commit()
    db.refresh(rate)
    return rate

def delete_rate (rate_id: int, db: Session):
    rate = db.query(Rate).filter(
        Rate.id == rate_id,
        Rate.active == True
    ).first()

    if rate is None:
        return None
    
    rate.active = False
    db.commit()
    db.refresh(rate)
    return rate

