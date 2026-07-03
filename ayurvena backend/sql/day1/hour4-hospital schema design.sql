CREATE TYPE gender_type AS ENUM (
   'Male',
   'Female',
   'Other'
);

CREATE TYPE blood_type AS ENUM (
   'A+','A-',
   'B+','B-',
   'AB+','AB-',
   'O+','O-'   
);

CREATE TYPE appointment_state AS ENUM (
    'scheduled',
    'checked-in',
    'in-progress',
    'completed',
    'cancelled',
    'no-show'
);

CREATE TYPE payment_mode AS ENUM (
    'cash',
    'card',
    'upi',
    'insurance',
    'bank-transfer'
);

ALTER TABLE payments
ADD CONSTRAINT chk_positive_amount
CHECK (amount > 0);

ALTER TABLE patients
ADD CONSTRAINT chk_patient_mobile
CHECK (
   (LENGTH(mobile) >= 10 AND LENGTH(mobile) <= 15)
);

ALTER TABLE doctors
ADD CONSTRAINT doctor_mobile_check
CHECK (
    (LENGTH(mobile) >= 10 AND LENGTH(mobile) <= 15)
);

ALTER TABLE patients
ADD CONSTRAINT uq_patient_mobile
UNIQUE (mobile);

ALTER TABLE patients
ADD CONSTRAINT uq_patient_email
UNIQUE (email);

ALTER TABLE doctors
ADD CONSTRAINT uq_doctor_mobile
UNIQUE (mobile);

CREATE TABLE consultations
(
    consultation_id SERIAL PRIMARY KEY,
    appointment_id INT NOT NULL UNIQUE,
    diagnosis VARCHAR(200) NOT NULL,
    symptoms TEXT,
    doctor_notes TEXT,
    vital_signs VARCHAR(200),
    next_visit DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_consultation_appointment
    FOREIGN KEY (appointment_id)
    REFERENCES appointments(id)
);

CREATE INDEX idx_consultation
ON consultations(appointment_id);

INSERT INTO consultations
(
appointment_id,
diagnosis,
symptoms,
doctor_notes,
vital_signs,
next_visit
)
VALUES
(
1,
'High Blood Pressure',
'Chest pain while walking',
'Medicine started and diet advised',
'BP 145/90, Pulse 82',
'2026-07-20'
),

(
2,
'Migraine',
'Severe headache',
'Take proper rest and drink more water',
'BP 120/80',
NULL
),
(
3,
'Knee Joint Pain',
'Pain while climbing stairs',
'Exercise regularly',
'BP 126/82',
'2026-07-25'
),
(
7,
'Blood Pressure Review',
'Routine follow-up',
'Condition improving',
'BP 122/80',
NULL
);

SELECT *
FROM consultations;

SELECT COUNT(*) AS total_consultations
FROM consultations;

SELECT COUNT(*)
FROM consultations c
LEFT JOIN appointments a
ON c.appointment_id = a.id
WHERE a.id IS NULL;

CREATE TABLE prescriptions
(
    prescription_id SERIAL PRIMARY KEY,
    consultation_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    remarks TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prescription_consultation
    FOREIGN KEY (consultation_id)
    REFERENCES consultations(consultation_id)
);

CREATE INDEX idx_prescription
ON prescriptions(consultation_id);

INSERT INTO prescriptions
(
consultation_id,
medicine_name,
dosage,
frequency,
duration,
remarks
)
VALUES
(1,'Amlodipine','5 mg','Once a day','30 Days','Take after breakfast'),
(1,'Aspirin','75 mg','Once a day','30 Days','Drink plenty of water'),
(2,'Paracetamol','500 mg','Twice a day','5 Days','Take after food'),
(2,'Vitamin B Complex','1 Tablet','Once a day','15 Days','Take after lunch'),
(3,'Diclofenac','50 mg','Twice a day','7 Days','Avoid heavy exercise'),
(3,'Calcium','500 mg','Once a day','30 Days','Take with milk'),
(4,'Amlodipine','5 mg','Once a day','15 Days','Continue previous medicine');

SELECT *
FROM prescriptions;

SELECT COUNT(*) AS total_prescriptions
FROM prescriptions;

SELECT COUNT(*)
FROM prescriptions p
LEFT JOIN consultations c
ON p.consultation_id = c.consultation_id
WHERE c.consultation_id IS NULL;

CREATE TABLE medical_records
(
    record_id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT,
    record_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    details TEXT,
    record_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_record_patient
    FOREIGN KEY (patient_id)
    REFERENCES patients(patient_id),
    CONSTRAINT fk_record_doctor
    FOREIGN KEY (doctor_id)
    REFERENCES doctors(doctor_id)
);

CREATE INDEX idx_patient_record
ON medical_records(patient_id);

CREATE INDEX idx_doctor_record
ON medical_records(doctor_id);

INSERT INTO medical_records
(
patient_id,
doctor_id,
record_type,
title,
details,
record_date
)
VALUES
(
1,
1,
'Blood Test',
'CBC Report',
'Blood test results are normal.',
'2026-07-05'
),
(
2,
2,
'Scan',
'Brain Scan',
'No abnormal findings.',
'2026-07-05'
),
(
3,
3,
'X-Ray',
'Knee X-Ray',
'Minor swelling near the knee joint.',
'2026-07-06'
),
(
4,
1,
'ECG',
'Heart Check',
'ECG report is normal.',
'2026-07-06'
),
(
5,
2,
'Vaccination',
'Tetanus Vaccine',
'Vaccination completed successfully.',
'2026-07-07'
);

SELECT *
FROM medical_records;

SELECT COUNT(*) AS total_records
FROM medical_records;

SELECT COUNT(*)
FROM medical_records mr
LEFT JOIN patients p
ON mr.patient_id = p.patient_id
WHERE p.patient_id IS NULL;

SELECT COUNT(*)
FROM medical_records mr
LEFT JOIN doctors d
ON mr.doctor_id = d.doctor_id
WHERE d.doctor_id IS NULL;

SELECT 'Consultations' AS table_name, COUNT(*) AS total
FROM consultations
UNION ALL
SELECT 'Prescriptions', COUNT(*)
FROM prescriptions
UNION ALL
SELECT 'Medical Records', COUNT(*)
FROM medical_records;

SELECT COUNT(*) AS invalid_consultations
FROM consultations c
LEFT JOIN appointments a
ON c.appointment_id = a.id
WHERE a.id IS NULL;

SELECT COUNT(*) AS invalid_prescriptions
FROM prescriptions p
LEFT JOIN consultations c
ON p.consultation_id = c.consultation_id
WHERE c.consultation_id IS NULL;

SELECT COUNT(*) AS invalid_records
FROM medical_records m
LEFT JOIN patients p
ON m.patient_id = p.patient_id
WHERE p.patient_id IS NULL;


SELECT
p.first_name || ' ' || p.last_name AS patient_name,
d.first_name || ' ' || d.last_name AS doctor_name,
a.appointment_date,
c.diagnosis,
pr.medicine_name,
pay.amount,
pay.payment_status
FROM appointments a
JOIN patients p
ON a.patient_id = p.patient_id
JOIN doctors d
ON a.doctor_id = d.doctor_id
LEFT JOIN consultations c
ON a.id = c.appointment_id
LEFT JOIN prescriptions pr
ON c.consultation_id = pr.consultation_id
LEFT JOIN payments pay
ON a.id = pay.appointment_id
ORDER BY
a.appointment_date,
patient_name;

SELECT
d.first_name || ' ' || d.last_name AS doctor,
COUNT(c.consultation_id) AS total_consultations
FROM doctors d
LEFT JOIN appointments a
ON d.doctor_id = a.doctor_id
LEFT JOIN consultations c
ON a.id = c.appointment_id
GROUP BY
d.doctor_id,
doctor
ORDER BY
total_consultations DESC;

SELECT
medicine_name,
COUNT(*) AS prescribed_times
FROM prescriptions
GROUP BY medicine_name
ORDER BY prescribed_times DESC;


SELECT
    p.first_name,
    p.last_name,
    m.record_type,
    m.title,
    m.record_date
FROM medical_records m
JOIN patients p
ON m.patient_id = p.patient_id
ORDER BY m.record_date DESC;

