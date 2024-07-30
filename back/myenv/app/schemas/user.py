from pydantic import BaseModel

class UserLogin(BaseModel):
    id: str
    password: str

class UserRegister(BaseModel):
    id: str
    email: str
    password: str

class UserOut(BaseModel):
    id: str
    email: str

    class Config:
        from_attributes = True
