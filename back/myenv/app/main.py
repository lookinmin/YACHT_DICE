from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import login, signup, check_id

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 각 라우터를 명확한 경로와 태그로 등록 (prefix 제거)
app.include_router(login.router, tags=["login"])
app.include_router(signup.router, tags=["signup"])
app.include_router(check_id.router, tags=["check-id"])
