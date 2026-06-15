const fs = require("fs");

const path = require("path");

const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(express.json());

const SECRET = "hospital-secret";

const dbPath = path.join(__dirname, "db.json");

let patients = [];

let doctors = [];

app.post("/login", (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (
        email === "admin@hospital.com" &&
        password === "admin123"
    ) {
        const token = jwt.sign(
            { email },
            SECRET,
            { expiresIn: "7d" } 
        );
        return res.json({
            token
        });
    }

    return res.status(401).json({
        message: "Invalid Credentials"
    });
});

app.get(
    "/patients",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        res.json(db.patients);
    }
);

app.post(
    "/patients",
    (req, res) => {
        
        const patient = req.body;

        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));

        db.patients.push(patient);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res
            .status(201)
            .json(patient);
    }
);

app.get(
    "/doctors",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        res.json(db.doctors);
    }
);

app.post(
    "/doctors",
    (req, res) => {
        
        const doctor = req.body;

        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));

        db.doctors.push(doctor);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res
            .status(201)
            .json(doctor);
    }
);

app.get(
    "/appointments",
    (req, res) => {
        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));
        res.json(db.appointments);
    }
);

app.post(
    "/appointments",
    (req, res) => {
        
        const appointment = req.body;

        const db = JSON.parse(fs.readFileSync(
            dbPath,
            "utf8"
        ));

        db.appointments.push(appointment);

        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        res
            .status(201)
            .json(appointment);
    }
);

app.listen(3000, () => {
    console.log(
        "Server running on port 3000"
    );
});