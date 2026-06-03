from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi import HTTPException

from app.database.dependencies import get_db

from app.schemas.product import ProductCreate
from app.schemas.product import ProductResponse
from app.schemas.product import ProductUpdate

from app.services.product_service import create_product, get_products, get_product_by_id, update_product, delete_product

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/", response_model=ProductResponse)
def create_new_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    return create_product(db, product)


@router.get("/", response_model=List[ProductResponse])
def read_products(
    db: Session = Depends(get_db)
):
    return get_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def read_product_by_id(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = get_product_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404, 
            detail="Product not found")
    return product
       

@router.put("/{product_id}", response_model=ProductResponse)
def update_product_by_id(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db)
):
    product = update_product(db, product_id, product_data)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product


@router.delete("/{product_id}", response_model=ProductResponse)
def delete_product_by_id(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = delete_product(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product
