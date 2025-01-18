from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.context import CryptContext
from db import SessionLocal, User
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from decouple import config

app = FastAPI()

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models for API requests
class RegisterRequest(BaseModel):
    email: str
    password: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Model for delete request
class DeleteUserRequest(BaseModel):
    email: str

@app.delete("/api/delete-user")
def delete_user(request: DeleteUserRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

VALID_ROLES = ["student", "teacher", "admin"]

# API Endpoints
@app.post("/api/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    # Validate role
    if request.role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail="Invalid role")

    # Check if user already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and create a new user
    hashed_password = pwd_context.hash(request.password)
    new_user = User(email=request.email, hashed_password=hashed_password, role=request.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/api/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate a JWT token
    try:
        token = jwt.encode({"sub": user.email, "role": user.role}, SECRET_KEY, algorithm=ALGORITHM)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Token generation failed: {str(e)}")

    return {"message": "Login successful", "role": user.role, "token": token}

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to match your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and create a new user
    hashed_password = pwd_context.hash(request.password)
    new_user = User(email=request.email, hashed_password=hashed_password, role=request.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

