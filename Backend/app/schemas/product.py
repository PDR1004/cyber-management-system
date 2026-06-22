from pydantic import BaseModel, Field
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    purchase_price: float = Field(gt=0)
    sale_price: float = Field(gt=0)
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