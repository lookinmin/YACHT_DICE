from sqlalchemy import Column, String, JSON
from app.db import Base

class User(Base):
    __tablename__ = 'user_info'
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    friends = Column(JSON, nullable=True)