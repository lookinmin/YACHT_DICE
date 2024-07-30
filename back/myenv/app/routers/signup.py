from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.dependencies.database import get_db
from app.dependencies.security import get_password_hash

router = APIRouter()

@router.post('/signup', response_model=user_schemas.UserOut)
def create_user(user: user_schemas.UserRegister, db: Session = Depends(get_db)):   
    db_user = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Already Joined Email")

    hashed_pw = get_password_hash(user.password)
    db_user = user_models.User(id=user.id, email=user.email, password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user
