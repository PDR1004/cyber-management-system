from pydantic import BaseModel


class ConsoleCreate(BaseModel):
    name: str

class ConsoleResponse(BaseModel):
    id: int
    name: str
    status: str

    class Config:
        from_attributes = True