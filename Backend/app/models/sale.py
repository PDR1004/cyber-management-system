from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.orm import relationship

from app.database.connection import Base

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    sale_date  = Column(DateTime)
    total = Column(Float, default=0)

    details = relationship(
        "SaleDetail",
        back_populates="sale"
    )