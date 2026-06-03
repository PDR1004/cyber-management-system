from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    purchase_price: float
    sale_price: float
    stock: int
    category: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    purchase_price: float
    sale_price: float
    stock: int
    category: Optional[str] = None
    active: bool

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: str
    purchase_price: float
    sale_price: float
    stock: int
    category: Optional[str] = None