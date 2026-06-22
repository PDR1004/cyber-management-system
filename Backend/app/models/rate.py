from sqlalchemy import Column, Integer, Float, Boolean
from app.database.connection import Base

class Rate(Base):
    __tablename__ = "rates"
    id = Column(Integer, primary_key=True, index=True)
    players_count = Column(Integer, nullable=False)
    price_per_hour = Column(Float, nullable=False)
    active = Column(Boolean, default=True)
