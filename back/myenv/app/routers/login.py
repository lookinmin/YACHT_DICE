from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.dependencies.database import get_db
from app.dependencies.security import create_access_token, verify_password
from datetime import timedelta

router = APIRouter()

@router.post('/login')
def login(user: user_schemas.UserLogin, db: Session = Depends(get_db)):
    is_user = db.query(user_models.User).filter(user_models.User.id == user.id).first()
    if not is_user or not verify_password(user.password, is_user.password):
        raise HTTPException(status_code=400, detail="INVALID ID or Password")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": is_user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
