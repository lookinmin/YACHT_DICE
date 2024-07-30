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

# db 연결
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# 패스워드 암호화
def get_password_hash(password):
    return pwd_context.hash(password)

# 패스워드 복호화
def verify(plain : str, hashed : str) -> bool:
    return pwd_context.verify(plain, hashed)

# 로그인 성공한 유저에게 토큰 부여
def create_access_token(data : dict, expires_delta : timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# login 라우터
@router.post('/login')
def login(user : user_schemas.UserLogin, db: Session = Depends(get_db)):
    is_user = db.query(user_models.User).filter(user_models.User.id == user.id).first()
    # db에서 넘어온 user data에 해당하는 user를 찾는다.
    if not is_user or not verify(user.password, is_user.password):
        # 유저가 존재하지 않거나, id, password 쌍이 일치하지 않는다면
        raise HTTPException(status_code=400, detail="INVALID ID or Password")
        # 400 오류 제공
        
    # 로그인 정보가 올바르다면
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub" : is_user.id}, expires_delta = access_token_expires
    )
    # 유저 id 정보가 담긴 로그인 토큰 부여, 현재는 60분 기준
    return {"access_token" : access_token, "token_type" : "bearer"}

# signup 라우터
@router.post('/signup', response_model= user_schemas.UserOut)
def create_user(user : user_schemas.UserRegister, db : Session = Depends(get_db)):   
    db_user = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    # 겹치는 email 정보가 있는지 확인, 한 유저(email 당)는 하나의 계정만 생성 가능
    if db_user:
        return HTTPException(status_code=400, detail="Already Joined Email")
    # 이미 해당 email로 만든 계정이 있다면 400 오류 제공

    # 회원가입한 pw를 암호화
    hashed_pw = get_password_hash(user.password)
    db_user = user_models.User(id = user.id, email = user.email, password = hashed_pw)
    # id, email, 암호화된 pw를 mysql db에 저장
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    # db 최신화
    
    return db_user

# id 중복체크 라우터
@router.get('/check-id/{id}')
def check_id(id:str, db:Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    # 현재 입력중인 id가 중복인지 확인
    # 중복이라면 중복이라고 리턴
    return {"isDuplicate" : bool(db_user)}
