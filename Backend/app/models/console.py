from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.connection import Base

class Console(Base):
    __tablename__ = "consoles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String, default="Disponible")