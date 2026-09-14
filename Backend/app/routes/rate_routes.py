from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.rate import RateCreate, RateResponse, RateUpdate

from app.services.rate_service import create_rate, get_rates, get_rate_by_id, update_rate, delete_rate

router = APIRouter(
    prefix="/rates",
    tags=["Rates"]
)

@router.post("/", response_model=RateResponse, status_code = status.HTTP_201_CREATED)
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

@router.get("/{rate_id}", response_model=RateResponse)
def read_rate(
    rate_id: int,
    db: Session = Depends(get_db)
):
    rate = get_rate_by_id(rate_id, db)

    if rate is None:
        raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, 
        detail="Rate not found")
    return rate

@router.put ("/{rate_id}", response_model=RateResponse)
def update_rate_by_id(
    rate_id: int,
    rate_data: RateUpdate,
    db: Session = Depends(get_db)
):
    rate = update_rate(rate_id, rate_data, db)

    if rate is None:
        raise HTTPException(
        status_code= status.HTTP_404_NOT_FOUND, 
        detail="Rate not found")
    return rate

@router.delete ("/{rate_id}", response_model=RateResponse)
def delete_rate_by_id(
    rate_id: int,
    db: Session = Depends(get_db)
):
    rate = delete_rate(rate_id, db)
    if rate is None:
        raise HTTPException(
        status_code= status.HTTP_404_NOT_FOUND, 
        detail="Rate not found")
    return rate



