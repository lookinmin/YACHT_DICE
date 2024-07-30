from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models import user as user_models
from app.dependencies.database import get_db

router = APIRouter()

@router.get('/check-id/{id}')
def check_id(id: str, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    return {"isDuplicate": bool(db_user)}
