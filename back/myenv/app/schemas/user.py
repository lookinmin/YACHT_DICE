from pydantic import BaseModel

class UserCreate(BaseModel):
    id: str
    password: str

class UserOut(BaseModel):
    id: str
    email: str

    class Config:
        from_attributes = True
