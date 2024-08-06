from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_models
from app.dependencies.database import get_db
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

router = APIRouter()

@router.get('/friends/{id}')
def get_friends(id:str, db : Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="USER NOT FOUND")

    friends = db_user.friends if db_user.friends else []
    cvt_list = [str(friend) for friend in friends]
    print("친구목록", cvt_list)
    return {"friends" : cvt_list}

