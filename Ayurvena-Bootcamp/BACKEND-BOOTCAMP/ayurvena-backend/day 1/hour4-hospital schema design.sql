CREATE TYPE gender_enum AS ENUM('Male', 'Female', 'Other');
CREATE TYPE blood_group_enum AS ENUM (
    'A+', 'A-',
    'B+', 'B-',
    'AB+', 'AB-',
    'O+', 'O-'
);
CREATE TYPE appointment_status_enum AS ENUM (
    'scheduled', 'checked-in', 'in-progress', 'completed', 'cancelled', 'no-show'
);
CREATE TYPE payment_status_enum AS ENUM (
    'pending', 'paid', 'failed', 'refunded', 'partially-paid'
);
CREATE TYPE payment_method_enum AS ENUM (
    'cash',
    'card', '
    upi', 
    'insurance', 
    'bank-transfer'
);

ALTER TABLE payments 
ADD CONSTRAINT chk_apyment_amount_posititve CHECK (amount > 0);

INSERT INTO payments (appointment_id, amount, payment_method, payment_status)
VALUES (1, 0, 'cash', 'pending');

ALTER TABLE patients
ADD CONSTRAINT chk_patients_phone_length CHECK (LENGTH(phone)>=10 and LENGTH(phone)<=15);
ALTER TABLE doctors
ADD CONSTRAINT chk_doctor_phone_length CHECK (LENGTH(phone) >= 10 AND LENGTH(phone) <= 15);

--unique constraiunts

ALTER TABLE patients
ADD CONSTRAINT uq_patient_phone UNIQUE (phone);
ALTER TABLE patients
ADD CONSTRAINT uq_patient_email UNIQUE (email);

ALTER TABLE doctors
ADD CONSTRAINT uq_doctor_phone UNIQUE (phone);

-- CREATING CONSULTATION TABLE
create table consultations (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER NOT NULL UNIQUE REFERENCES appointments(id),
    diagnosis TEXT NOT NULL,
    notes TEXT,
    symptoms TEXT,
    vitals TEXT,
    follow_up_date DATE,
    follow_up_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
create index idx_consultations_appointment_id on consultations(appointment_id);

insert into consultations(appointment_id, diagnosis, notes, symptoms, vitals, follow_up_date, follow_up_notes)
values
    (1, 'Mild angina - stable', 
    'Patient reports chest tightness during physical activity. ECG shows minor ST changes.',
    'Chest pain, shortness of breath during exertion, occasional palpitations',
    'BP: 140/90, Pulse: 88, SpO2: 97%, Temp: 98.4F',
    '2024-03-20', 'Follow-up ECG and stress test recommended'),
    (2, 'Tension-type headache',
    'Bilateral headache worsening with stress. No neurological deficits.',
    'Bilateral headache, neck stiffness, sensitivity to light',
    'BP: 120/80, Pulse: 72, SpO2: 99%, Temp: 98.6F',
     NULL, NULL),
    (3, 'Mild osteoarthritis - right knee',
    'Crepitus on flexion. X-ray shows mild joint space narrowing.',
    'Right knee pain, stiffness in morning, difficulty climbing stairs',
    'BP: 130/85, Pulse: 76, SpO2: 98%, Temp: 98.2F',
    '2024-03-22', 'Physiotherapy referral. Review X-ray in follow-up.'),
    (4, 'Angina - improving with medication',
    'Patient reports reduced frequency of chest pain. Continuing medication.',
    'Occasional mild chest discomfort, improved exercise tolerance',
    'BP: 132/86, Pulse: 80, SpO2: 98%, Temp: 98.4F',
    NULL, NULL),
    (5, 'Normal cardiac function',
    'Annual checkup. All cardiac markers within normal limits. Echo normal.',
    'No symptoms - routine checkup',
    'BP: 118/76, Pulse: 68, SpO2: 99%, Temp: 98.6F',
    NULL, NULL);

select * from consultations;

-- CREATING PRESCRIPTION TABLE
create table prescriptions (
    id SERIAL PRIMARY KEY,
    consultation_id INTEGER NOT NULL REFERENCES consultations(id),
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    instructions TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_prescriptions_consultation_id ON prescriptions(consultation_id);

insert into prescriptions (consultation_id, medicine_name, dosage, frequency, duration, instructions)
values
    (1, 'Aspirin', '75mg', 'Once daily', '30 days', 'Take after breakfast'),
    (1, 'Atorvastatin', '10mg', 'Once daily at night', '30 days', 'Take at bedtime'),
    (1, 'Sorbitrate', '5mg', 'As needed', '30 days', 'Place under tongue during chest pain'),
    (2, 'Paracetamol', '500mg', 'Twice daily', '5 days', 'Take after food'),
    (2, 'Amitriptyline', '10mg', 'Once daily at night', '14 days', 'May cause drowsiness'),
    (3, 'Diclofenac', '50mg', 'Twice daily', '7 days', 'Take after food. Avoid on empty stomach.'),
    (3, 'Calcium + Vitamin D3', '500mg', 'Once daily', '30 days', 'Take after lunch'),
    (3, 'Glucosamine', '1500mg', 'Once daily', '60 days', 'Take with food'),
    (4, 'Aspirin', '75mg', 'Once daily', '30 days', 'Continue as before. Take after breakfast.'),
    (4, 'Atorvastatin', '10mg', 'Once daily at night', '30 days', 'Continue. Take at bedtime.'),
    (4, 'Metoprolol', '25mg', 'Once daily', '30 days', 'New addition. Monitor pulse rate.');

SELECT * FROM prescriptions;

-- CREATING MEDICAL_RECORDS TABLE
create table medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id),
    record_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    attachments TEXT,
    recorded_by INTEGER REFERENCES doctors(id),
    record_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_recorded_by ON medical_records(recorded_by);
CREATE INDEX idx_medical_records_record_type ON medical_records(record_type);

insert into medical_records (patient_id, record_type, title, description, attachments, recorded_by, record_date)
values
    (1, 'lab_result', 'Complete Blood Count',
    'Hemoglobin: 14.2 g/dL, WBC: 7500/uL, Platelets: 250000/uL. All values within normal range.',
    '/records/ravi/cbc-2024-03-15.pdf', 1, '2024-03-15'),
    (1, 'imaging', 'ECG Report',
    'Sinus rhythm. Minor ST segment changes in leads V4-V6. No acute ischemia.',
    '/records/ravi/ecg-2024-03-15.pdf', 1, '2024-03-15'),
    (1, 'imaging', 'Chest X-Ray',
    'Heart size normal. Lungs clear. No pleural effusion.',
    '/records/ravi/chest-xray-2024-03-15.pdf', 1, '2024-03-15'),
    (2, 'lab_result', 'Thyroid Panel',
     'TSH: 3.2 mIU/L (normal), T3: 120 ng/dL (normal), T4: 8.5 ug/dL (normal).',
     '/records/priya/thyroid-2024-03-15.pdf', 2, '2024-03-15'),
    (3, 'imaging', 'Right Knee X-Ray',
     'Mild joint space narrowing in medial compartment. No fracture or dislocation. Early osteoarthritis.',
     '/records/amit/knee-xray-2024-03-16.pdf', 3, '2024-03-16'),
    (4, 'vaccination', 'COVID-19 Vaccination - Dose 2',
     'Covishield vaccine administered. Batch: ABCD1234. No adverse reactions observed.',
     NULL, NULL, '2021-09-15'),
    (5, 'allergy', 'Drug Allergy - Penicillin',
     'Patient reports severe rash and swelling after penicillin administration in 2019. Confirmed Type I hypersensitivity.',
     NULL, NULL, '2019-06-20');

select * from medical_records;

-- TEST CASES
select 'consultations' as table_name, count(*) as row_count from consultations 
union all
select 'prescriptions', count(*) from prescriptions
union all
select 'medical_records', count(*) from medical_records;

select count(*) from consultations c
left join appointments a on c.appointment_id = a.id
where a.id is null;

SELECT COUNT(*) FROM prescriptions p
LEFT JOIN consultations c ON p.consultation_id = c.id
WHERE c.id IS NULL;

SELECT COUNT(*) FROM medical_records mr
LEFT JOIN patients p ON mr.patient_id = p.id
WHERE p.id IS NULL;

SELECT
    p.firstname || ' ' || p.lastname AS patient,
    d.firstname || ' ' || d.lastname AS doctor,
    a.appointment_date,
    c.diagnosis,
    pr.medicine_name,
    pr.dosage,
    pr.frequency,
    pay.amount AS payment,
    pay.payment_status
FROM appointments a
INNER JOIN patients p ON a.patient_id = p.id
INNER JOIN doctors d ON a.doctor_id = d.id
LEFT JOIN consultations c ON a.id = c.appointment_id
LEFT JOIN prescriptions pr ON c.id = pr.consultation_id
LEFT JOIN payments pay ON a.id = pay.appointment_id
WHERE a.status = 'completed'
ORDER BY a.appointment_date, p.lastname, pr.medicine_name;