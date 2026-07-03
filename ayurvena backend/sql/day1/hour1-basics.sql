CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    mobile VARCHAR(15),
    email VARCHAR(100),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    specialization VARCHAR(100),
    qualification VARCHAR(100),
    mobile VARCHAR(15),
    email VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE NOT NULL,
    floor_no INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients
(first_name,last_name,dob,gender,blood_group,mobile,email,city)
VALUES
('Rahul','Verma','1995-01-10','Male','O+','9000011111','rahul@email.com','Hyderabad'),
('Sneha','Rao','1998-06-22','Female','A+','9000011112','sneha@email.com','Bangalore'),
('Kiran','Reddy','1992-11-14','Male','B+','9000011113','kiran@email.com','Warangal'),
('Divya','Sharma','2001-02-19','Female','AB+','9000011114','divya@email.com','Chennai'),
('Arjun','Patel','1990-08-30','Male','O-','9000011115','arjun@email.com','Pune');

INSERT INTO doctors
(first_name,last_name,specialization,qualification,mobile,email,department)
VALUES
('Ramesh','Kumar','Cardiology','MBBS, MD','9888811111','ramesh@hospital.com','Cardiology'),
('Lakshmi','Devi','Neurology','MBBS, DM','9888811112','lakshmi@hospital.com','Neurology'),
('Suresh','Naidu','Orthopedics','MBBS, MS','9888811113','suresh@hospital.com','Orthopedics');

INSERT INTO departments
(department_name,floor_no,description)
VALUES
('Cardiology',2,'Heart treatment'),
('Neurology',3,'Brain and nerves'),
('Orthopedics',1,'Bone treatment'),
('Emergency',0,'Emergency services');

SELECT * FROM patients;
SELECT * FROM doctors;
SELECT * FROM departments;


SELECT first_name,last_name
FROM patients;

SELECT first_name,last_name
FROM patients
WHERE blood_group='O+';

SELECT *
FROM patients
WHERE gender='Female';

SELECT first_name,last_name
FROM doctors
WHERE department='Neurology';

SELECT department_name,floor_no
FROM departments
WHERE floor_no>0;

SELECT first_name,last_name
FROM patients
WHERE last_name LIKE 'P%';

SELECT COUNT(*) AS total_patients
FROM patients;

SELECT COUNT(*) AS total_doctors
FROM doctors;

SELECT COUNT(*) AS total_departments
FROM departments;

SELECT COUNT(*)
FROM patients
WHERE gender='Male';

INSERT INTO departments(department_name,floor_no,description)
VALUES('Cardiology',5,'Duplicate Department');