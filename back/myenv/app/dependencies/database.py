from sqlalchemy.orm import Session
# 세션 관리 클래스 import
from app.db import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
        # yield를 통해, get_db는 제너레이터가 된다.
        # FastAPI를 generator 함수가 호출될 때 반환된 값을 의존성으로 사용하고
        # 끝나면 finally를 통해 정리한다.
    finally:
        db.close()

# 해당 로직을 통해 요청이 들어오면 세션을 열고, 처리 이후 세션을 닫기 때문에 세션 누수가 발생하지 않는다.