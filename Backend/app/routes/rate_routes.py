from typing import List

from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.rate import RateCreate, RateResponse

from app.services.rate_service import create_rate, get_rates

router = APIRouter(
    prefix="/rates",
    tags=["Rates"]
)

@router.post("/", response_model=RateResponse)
def create_new_rate(
    rate: RateCreate,
    db: Session = Depends(get_db)
):
    return create_rate(db, rate)

@router.get("/", response_model=List[RateResponse])
def read_rates(
    db: Session = Depends(get_db)
):
    return get_rates(db)