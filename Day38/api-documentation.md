# API Documentation

## Authentication

    POST /Login

Request

    {
        "email": "admin@hospital.com",
        "password": "admin123"
    }

Response

    {
        "token": "jwt_token"
    }

---

## Patients

    GET /patients
    
    GET /patients/:id
    
    POST /patients
    
    PUT /patients/:id
    
    DELETE /patients/:id

---

## Doctors

    GET /doctors
    
    GET /doctors/:id
    
    POST /doctors
    
    PUT /doctors/:id
    
    DELETE /doctors/:id

---

## Appointments

    GET /appointments
    
    GET /appointments/:id
    
    POST /appointments
    
    PUT /appointments/:id
    
    DELETE /appointments/:id

---

## Notifications

    GET /notifications
    
    POST /notifications
