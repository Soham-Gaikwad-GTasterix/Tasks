# Database Models

## User

    {
        "_id": "ObjectId",
        "email": "admin@hospital.com",
        "password": "hashedPassword",
        "role": "admin"
    }

---

## Patient

    {
        "_id": "ObjectId",
        "name": "Test",
        "email": "test@test.com",
        "age": "25",
        "gender": "Female",
        "disease": "Cold",
        "date": "2026-06-17",
        "phoneNo": "8864664949",
        "bloodGroup": "B+",
        "roomNo": "202",
        "photo": "url"
    }

---

## Doctor

    {
        "_id": "ObjectId",
        "name": "Raj",
        "email": "raj@hospital.com",
        "specialization": "Surgery",
        "experience": "10",
        "department": "Surgery",
        "qualification": "MBBS",
        "phoneNo": "9876160351",
        "photo": "url"
    }

---

## Appointment

    {
        "_id": "ObjectId",
        "patient": "Test",
        "doctor": "Raj",
        "date": "2026-06-17",
        "time": "17:30",
        "status": "Scheduled"
    }
