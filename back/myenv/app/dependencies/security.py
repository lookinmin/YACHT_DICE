from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 암호화 알고리즘과 옵션 설정
SECRET_KEY = os.getenv('SECRET_KEY', "default")
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 패스워드 암호화
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# 패스워드 검증
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# 토큰 생성
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# 현재 사용자

def get_current_user(token : str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "유효하지 않은 토큰입니다.",
        headers = {"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get('sub')
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user_id