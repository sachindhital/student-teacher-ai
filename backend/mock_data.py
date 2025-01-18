from db import SessionLocal, User, Assignment, Attendance, ClassPerformance
from datetime import date

db = SessionLocal()

# Add Users
teacher = User(email="teacher@example.com", hashed_password="hashed_teacher_password", role="teacher")
student1 = User(email="alice@example.com", hashed_password="hashed_student_password", role="student")
student2 = User(email="bob@example.com", hashed_password="hashed_student_password", role="student")
db.add_all([teacher, student1, student2])
db.commit()

# Add Assignments
assignment1 = Assignment(title="Math Homework", due_date=date(2023, 10, 15), student_id=student1.id)
assignment2 = Assignment(title="Science Project", due_date=date(2023, 10, 20), student_id=student2.id)
db.add_all([assignment1, assignment2])
db.commit()

# Add Attendance
attendance1 = Attendance(student_id=student1.id, attendance_percentage=85.0)
attendance2 = Attendance(student_id=student2.id, attendance_percentage=90.0)
db.add_all([attendance1, attendance2])
db.commit()

# Add Class Performance
performance1 = ClassPerformance(student_id=student1.id, grade="A")
performance2 = ClassPerformance(student_id=student2.id, grade="B+")
db.add_all([performance1, performance2])
db.commit()

db.close()
print("Mock data added successfully!")
