CREATE TABLE appointments (
id SERIAL PRIMARY KEY,
patient_id INT REFERENCES patients(patient_id),
doctor_id INT REFERENCES doctors(doctor_id),
appointment_date DATE NOT NULL,
appointment_time TIME NOT NULL,
status VARCHAR(20) DEFAULT 'Scheduled',
reason TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM appointments;

INSERT INTO appointments
(patient_id, doctor_id, appointment_date, appointment_time, status, reason)
VALUES
(1,1, '2026-07-05','09:00', 'Completed', 'Regular heart checkup'),
(2,2, '2026-07-05','10:00', 'Completed', 'Severe headache'),
(3,3, '2026-07-06','11:00', 'Scheduled', 'Knee pain'),
(4,1, '2026-07-06','02:00', 'Scheduled', 'Chest discomfort'),
(5,2, '2026-07-07','03:00', 'Cancelled', 'Migraine'),
(1,3, '2026-07-08','09:30', 'Scheduled', 'Back pain'),
(2,1, '2026-07-08','10:30', 'Completed', 'Blood pressure check'),
(3,2, '2026-07-09','11:30', 'Scheduled', 'Dizziness'),
(4,3, CURRENT_DATE,'12:30', 'Scheduled', 'Shoulder pain'),
(5,1, CURRENT_DATE,'01:30', 'Scheduled', 'Heart screening');

SELECT * FROM appointments;

SELECT
    a.id AS appointment_id,
    p.first_name,
    p.last_name,
    d.first_name AS doctor_first_name,
    d.last_name AS doctor_last_name,
    d.specialization,
    a.appointment_date,
    a.appointment_time,
    a.status
FROM appointments a
JOIN patients p
ON a.patient_id = p.patient_id
JOIN doctors d
ON a.doctor_id = d.doctor_id
ORDER BY a.appointment_date;

INSERT INTO patients
(first_name, last_name, dob, gender, blood_group, mobile, email, city)
VALUES
('Keerthi', 'Rao', '1998-10-12', 'Female', 'A+', '9999999999', 'Keerthi@email.com', 'Hyderabad');

SELECT
   p.first_name,
   p.last_name,
   a.appointment_date,
   a.status
FROM patients p
LEFT JOIN appointments a
ON p.patient_id= a.patient_id
ORDER BY p.first_name;

SELECT
   p.first_name,
   p.last_name
FROM patients p
LEFT JOIN appointments a
ON p.patient_id= a.patient_id
WHERE a.id IS NULL;

SELECT
    d.first_name,
	d.last_name,
	COUNT(a.id) AS total_appointments
FROM doctors d
JOIN appointments a
ON d.doctor_id= a.doctor_id
GROUP BY d.doctor_id, d.first_name, d.last_name
ORDER BY total_appointments DESC;

SELECT
    p.first_name,
	p.last_name,
	d.first_name AS doctor_name,
	a.appointment_time
FROM appointments a
JOIN patients p
ON a.patient_id= p.patient_id
JOIN doctors d
ON a.doctor_id= d.doctor_id
WHERE a.appointment_date = CURRENT_DATE;

SELECT
    p.first_name,
	d.first_name AS doctor_name,
	a.appointment_date,
	a.status
FROM appointments a
JOIN patients p
ON a.patient_id= p.patient_id
JOIN doctors d
ON a.doctor_id= d.doctor_id
WHERE a.appointment_date
BETWEEN CURRENT_DATE
AND CURRENT_DATE + INTERVAL '7 days';

SELECT COUNT(*) FROM appointments;

SELECT COUNT(*)
FROM appointments
WHERE patient_id = 1;

SELECT COUNT(*)
FROM patients p
LEFT JOIN appointments a
ON p.patient_id = a.patient_id
WHERE a.id IS NULL;

SELECT COUNT(*)
FROM appointments a
LEFT JOIN patients p
ON a.patient_id = p.patient_id
WHERE p.patient_id IS NULL;

SELECT COUNT(*)
FROM appointments a
LEFT JOIN doctors d
ON a.doctor_id = d.doctor_id
WHERE d.doctor_id IS NULL;
