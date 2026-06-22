from datetime import datetime

from pydantic import BaseModel

class SessionCreate(BaseModel):
    console_id: int
    players_count: int

class SessionResponse(BaseModel):
    id: int
    console_id: int
    rate_id: int
    players_count: int
    start_time: datetime
    end_time: datetime | None = None
    total_price: float
    active: bool

    class Config:
        from_attributes = True