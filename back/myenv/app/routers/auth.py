from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.db import SessionLocal
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
import os

SECRET_KEY = os.getenv('SECRET_KEY', "default")
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60

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

def verify(plain : str, hashed : str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data : dict, expires_delta : timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post('/login')
def login(user : user_schemas.UserCreate, db: Session = Depends(get_db)):
    is_user = db.query(user_models.User).filter(user_models.User.id == user.id).first()
    if not is_user or not verify(user.password, is_user.password):
        raise HTTPException(status_code=400, detail="INVALID ID or Password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub" : is_user.id}, expires_delta = access_token_expires
    )
    
    return {"access_token" : access_token, "token_type" : "bearer"}

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
