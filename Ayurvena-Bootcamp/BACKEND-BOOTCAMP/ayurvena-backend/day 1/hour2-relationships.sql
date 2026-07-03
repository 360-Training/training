--CREATING APPOINTMENTS TABLE
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);


insert into appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason)
values
    (1, 1, '2024-03-15', '09:00', 'completed', 'Chest pain and shortness of breath'),
    (2, 2, '2024-03-16', '10:30', 'completed', 'Recurring headaches for 2 weeks'),
    (3, 3, '2024-03-17', '11:00', 'completed', 'Knee pain after exercise'),
    (1, 1, '2024-03-2', '09:30', 'completed', 'Follow-up for chest pain'),
    (4, 1, '2024-03-18', '14:00', 'completed', 'Annual heart checkup'),
    (2, 3, '2024-03-19', '15:00', 'cancelled', 'Lower back pain'),
    (5, 2, '2024-03-20', '10:00', 'scheduled', 'Dizziness and balance issues'),
    (3, 3, '2024-03-22', '11:30', 'scheduled', 'Knee pain follow-up'),
    (4, 2, CURRENT_DATE, '16:00', 'scheduled', 'Numbness in left hand'),
    (5, 1, CURRENT_DATE, '17:00', 'scheduled', 'Preventive cardiac screening');

select * from appointments;

--INNER JOIN - SHOW APPOINTMENT WITH PATIENT AND DOCTOR NAMES
select 
    a.id AS appointmnet_id,
    p.firstname || ' ' || p.lastname AS patient_name,
    d.firstname || ' ' || d.lastname AS doctor_name,
    d.specialization,
    a.appointment_date,
    a.appointment_time,
    a.status,
    a.reason
from appointments a 
inner join patients p on a.patient_id = p.id
inner join doctors d on a.doctor_id = d.id
order by a.appointment_date, a.appointment_time;

-- left join -> show all patients, even those without appoinmtents
insert into patients (firstname, lastname, date_of_birth, gender, blood_group, phone, email, address)
values ('Kavitha', 'Menon', '1995-06-10', 'Female', 'O-', '9876543215', 'kavitha.menon@email.com', '12 Marine Drive, Mumbai');

select
    p.firstname || ' ' || p.lastname AS patient_name,
    p.blood_group,
    a.id AS appointment_id,
    a.appointment_date,
    a.status
from patients p
left join appointments a ON p.id = a.patient_id
order by p.firstname;

select 
    p.firstname || ' ' || p.lastname AS patient_name,
    p.phone
from patients p
left join appointments a ON p.id = a.patient_id
where a.id IS NULL; 

-- count appointments per doctor
select
    d.firstname || ' ' || d.lastname AS doctor_name,
    d.specialization,
    count(*) as total_appointments
from doctors d
inner join appointments a ON d.id = a.doctor_id
GROUP BY d.id, d.firstname, d.lastname, d.specialization
ORDER BY total_appointments DESC; 

select 
    p.firstname || ' ' || p.lastname as patient_name,
    d.firstname || ' ' || d.lastname as doctor_name,
    a.appointment_date,
    a.appointment_time,
    a.status
from appointments a
inner join patients p on a.patient_id = p.id
inner join doctors d on a.doctor_id = d.id
where a.appointment_date BETWEEN CURRENT_DATE and CURRENT_DATE + INTERVAl '7 days'
order by a.appointment_date, a.appointment_time; 

--TEST CASES
select count(*) from appointments;
select count(*) from appointments where patient_id = 1;
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
VALUES (999, 1, '2024-04-01', '10:00');

select count(*) from patients p
left join appointments a ON p.id = a.patient_id
where a.id IS NULL;

SELECT COUNT(*) FROM appointments a
LEFT JOIN patients p ON a.patient_id = p.id
WHERE p.id IS NULL;

SELECT COUNT(*) FROM appointments a
LEFT JOIN doctors d ON a.doctor_id = d.id
WHERE d.id IS NULL;