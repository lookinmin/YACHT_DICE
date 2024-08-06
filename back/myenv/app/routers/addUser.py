from fastapi import APIRouter, HTTPException
import pymysql
from dotenv import load_dotenv
import os
import json

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "yacht")

# Database connection function
def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

router = APIRouter()

@router.post('/addUser/{origin}/{other}')
def add_friend(origin: str, other: str):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Get userA
            cursor.execute("SELECT * FROM user_info WHERE id = %s", (origin,))
            userA = cursor.fetchone()
            if not userA:
                raise HTTPException(status_code=404, detail="User not found")
            
            # Get userB
            cursor.execute("SELECT * FROM user_info WHERE id = %s", (other,))
            userB = cursor.fetchone()
            if not userB:
                raise HTTPException(status_code=404, detail="User not found")
            
            # Decode the friends list from JSON
            friendsA = json.loads(userA['friends']) if userA['friends'] else []
            friendsB = json.loads(userB['friends']) if userB['friends'] else []
            
            # Add other to userA's friends list
            if other not in friendsA:
                friendsA.append(other)
            
            # Add origin to userB's friends list
            if origin not in friendsB:
                friendsB.append(origin)
            
            # Convert friends list back to JSON string
            friendsA_json = json.dumps(friendsA)
            friendsB_json = json.dumps(friendsB)
            
            # Update the database
            cursor.execute("UPDATE user_info SET friends = %s WHERE id = %s", (friendsA_json, origin))
            cursor.execute("UPDATE user_info SET friends = %s WHERE id = %s", (friendsB_json, other))
            
            # Commit the transaction
            connection.commit()
            
            print("Commit successful")
            
    except pymysql.MySQLError as e:
        connection.rollback()
        print(f"Commit failed: {e}")
        raise HTTPException(status_code=500, detail="Database commit failed")
    finally:
        connection.close()

    return {"message": "complete"}
