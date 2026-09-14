from pydantic import BaseModel, Field
from datetime import datetime

class SaleItem (BaseModel):
    product_id: int
    quantity: int = Field(gt=0)

class SaleCreate (BaseModel):
    products: list[SaleItem]

class SaleProductResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class SaleDetailResponse (BaseModel):
    product: SaleProductResponse
    quantity: int
    unit_price: float
    subtotal: float

    class Config:
        from_attributes = True

class SaleResponse (BaseModel):
    id: int
    sale_date: datetime
    total: float

    details: list[SaleDetailResponse]

    class Config:
        from_attributes = True