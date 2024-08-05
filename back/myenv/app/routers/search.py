from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models import user as user_models
from app.dependencies.database import get_db

router = APIRouter()

@router.post('/search/{id}')
def get_user(id : str, db : Session = Depends(get_db)):
    users = db.query(user_models.User).filter(user_models.User.id.like(f"%{id}%")).all()
    
    if not users:
        raise HTTPException(status_code=404, detail="No Users Found")
    user_list = []
    for user in users:
        if user.id != 'admin':
            user_list.append(user.id)
    
    return {"users" : user_list}