from sqlalchemy import create_engine, Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# PostgreSQL connection string
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/student_teacher_ai"

# Create the database engine
engine = create_engine(DATABASE_URL)

# Session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)

    # Relationship to link user to assignments, attendance, and performance
    assignments = relationship("Assignment", back_populates="student")
    attendance = relationship("Attendance", back_populates="student", uselist=False)
    performance = relationship("ClassPerformance", back_populates="student", uselist=False)

# Assignment model
class Assignment(Base):
    __tablename__ = "assignments"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    due_date = Column(Date, nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationship to link assignment to a student
    student = relationship("User", back_populates="assignments")

# Attendance model
class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    attendance_percentage = Column(Float, nullable=False)

    # Relationship to link attendance to a student
    student = relationship("User", back_populates="attendance")

# Class Performance model
class ClassPerformance(Base):
    __tablename__ = "class_performance"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    grade = Column(String, nullable=False)

    # Relationship to link performance to a student
    student = relationship("User", back_populates="performance")

# Create all tables in the database
Base.metadata.create_all(bind=engine)
