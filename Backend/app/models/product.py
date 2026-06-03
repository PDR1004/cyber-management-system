from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.connection import Base

class Product(Base): 
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    purchase_price = Column(Float, nullable=False)
    sale_price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    category = Column(String)
    active = Column(Boolean, default=True)

