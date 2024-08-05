from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_models
from app.dependencies.database import get_db

router = APIRouter()

@router.get('/friends/{id}')
def get_friends(id:str, db : Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="USER NOT FOUND")

    friends = db_user.friends if db_user.friends else []
    cvt_list = [str(friend) for friend in friends]
    return {"friends" : cvt_list}

@router.post('/addUser/{origin}/{other}')
def add_friend(origin: str, other: str, db: Session = Depends(get_db)):
    userA = db.query(user_models.User).filter(user_models.User.id == origin).first()
    userB = db.query(user_models.User).filter(user_models.User.id == other).first()
    
    if not userA or not userB:
        raise HTTPException(status_code=404, detail="User not found")
    
    if userA.friends is None:
        userA.friends = []
    if userB.friends is None:
        userB.friends = []
    
    # User ID를 friends 배열에 추가
    if other not in userA.friends:
        userA.friends.append(other)
        # 변경 사항을 세션에 반영
        db.add(userA)
        
    if origin not in userB.friends:
        userB.friends.append(origin)
        # 변경 사항을 세션에 반영
        db.add(userB)
    
    db.commit()
    
    return {"message": "complete"}