from sqlalchemy import Column, Integer, Float, Boolean, DateTime, ForeignKey
from app.database.connection import Base

class Session(Base): 

    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    console_id = Column(Integer, ForeignKey("consoles.id"), nullable=False)
    rate_id = Column(Integer, ForeignKey("rates.id"), nullable=False)
    players_count = Column(Integer, default=1)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)
    total_price = Column(Float, default=0.0)
    active = Column(Boolean, default=True)
    