from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.db import SessionLocal
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
def get_password_hash(password):
    return pwd_context.hash(password)

@router.post('/signup', response_model= user_schemas.UserOut)
def create_user(user : user_schemas.UserCreate, db : Session = Depends(get_db)):   
    db_user = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    if db_user:
        return HTTPException(status_code=400, detail="Already Joined Email")

    hashed_pw = get_password_hash(user.password)
    db_user = user_models.User(id = user.id, email = user.email, password = hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.get('/check-id/{id}')
def check_id(id:str, db:Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    return {"isDuplicate" : bool(db_user)}
