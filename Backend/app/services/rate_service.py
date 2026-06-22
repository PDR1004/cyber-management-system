from sqlalchemy.orm import Session

from app.models.rate import Rate
from app.schemas.rate import RateCreate

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

