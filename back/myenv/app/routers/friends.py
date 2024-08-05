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

@router.post('/addUser/{origin}/{other}')
def add_friend(origin: str, other: str, db: Session = Depends(get_db)):
    userA = db.query(user_models.User).filter(user_models.User.id == origin).first()
    userB = db.query(user_models.User).filter(user_models.User.id == other).first()
    
    if not userA or not userB:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Ensure that friends lists are not None
    if userA.friends is None:
        userA.friends = []
    if userB.friends is None:
        userB.friends = []

    # Add the other user's ID to the friends list if not already added
    if other not in userA.friends:
        userA.friends.append(other)
        
    if origin not in userB.friends:
        userB.friends.append(origin)

    print(f"Before commit: userA.friends = {userA.friends}")
    print(f"Before commit: userB.friends = {userB.friends}")

    try:
        db.commit()
        db.refresh(userA)
        db.refresh(userB)
        print("Commit successful")
        return {"message": "complete"}
    except Exception as e:
        db.rollback()
        print(f"Commit failed: {e}")
        raise HTTPException(status_code=500, detail="Database commit failed")
    finally:
        db.close()  # 확실하게 세션을 종료

    return {"message": "complete"}