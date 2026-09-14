from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base

class SaleDetail(Base):
    __tablename__ = "sale_details"

    id = Column(Integer, primary_key=True, index=True)

    sale_id = Column(
        Integer, 
        ForeignKey("sales.id")
    )

    product_id = Column(
        Integer, 
        ForeignKey("products.id")
    )

    quantity = Column(Integer)

    unit_price = Column(Float)

    subtotal = Column(Float, default=0)

    sale = relationship(
        "Sale",
        back_populates="details"
    )

    product = relationship(
        "Product",
        back_populates="sale_details"
    )