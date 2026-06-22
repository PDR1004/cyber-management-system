from pydantic import BaseModel, Field

class RateCreate (BaseModel):
    players_count: int = Field(gt=0)
    price_per_hour: float = Field(gt=0)

class RateResponse (BaseModel):
    id: int
    players_count: int
    price_per_hour: float
    active: bool

    class Config:
        from_attributes = True
