from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.dependencies import get_db

from app.schemas.sale import SaleResponse, SaleCreate

from app.services.sale_service import (
    create_sale,
    get_sales,
    get_sale_by_id
)

router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)

@router.post ("/", response_model = SaleResponse, status_code=status.HTTP_201_CREATED)
def create_new_sale (
    sale_data: SaleCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_sale(db, sale_data)

    except ValueError as error:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

@router.get ("/", response_model = List[SaleResponse])
def read_sales (
    db: Session = Depends(get_db)
):
    return get_sales(db)

@router.get ("/{sale_id}", response_model = SaleResponse)
def read_sales (
    sale_id: int,
    db: Session = Depends(get_db)
):
    sale = get_sale_by_id(db, sale_id)

    if sale is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sale not found"
        )

    return sale

    