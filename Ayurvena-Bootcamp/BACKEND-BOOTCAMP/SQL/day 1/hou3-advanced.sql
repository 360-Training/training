--indexes, aggregates and payments table

CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_doctors_specialization ON doctors(specialization);
CREATE INDEX idx_appountments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appountments_doctor_id ON appointments(doctor_id);

EXPLAIN SELECT * FROM patients WHERE phone = '9876543210';

select 
    blood_group, 
    COUNT (*) AS patient_count
from patients
where blood_group IS NOT NULL
GROUP BY blood_group
ORDER BY patient_count DESC;

SELECT 
    blood_group,
    COUNT (*) AS patient_count
from patients
where blood_group IS NOT NULL
GROUP BY blood_group 
HAVING COUNT(*) > 1
ORDER BY patient_count DESC;

--AGGREGATE QUERY
select
    d.department,
    count(*) as total_appointments,
    count(CASE WHEN a.status = 'completed' THEN 1 END) as completed,
    count(CASE WHEN a.status = 'scheduled' THEN 1 END) as scheduled,
    count(CASE WHEN a.status = 'cancelled' THEN 1 END) as cancelled
from appointments a 
inner join doctors d on a.doctor_id = d.id
group by d.department
order by total_appointments DESC;

--TOP 3 DOCTORS BY APPOINTNENT COUNT
select 
    d.firstname || ' ' || d.lastname as doctor_name,
    d.specialization,
    d.department,
    count(*) as appointment_count
from doctors d
inner join appointments a on d.id = a.doctor_id
group by d.id, d.firstname, d.lastname, d.specialization, d.department
order by appointment_count DESC
LIMIT 3;

select 
    d.firstname || ' ' || d.lastname AS doctor_name,
    count(*) as completed_appointments
from doctors d
inner join appointments a ON d.id = a.doctor_id
where a.status = 'completed'
group by d.id, d.firstname, d.lastname
order by completed_appointments DESC
LIMIT 1;

-- CREATING THE PAYMENTS TABLE
create table payments (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER NOT NULL REFERENCES appointments(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    paid_at TIMESTAMP
);
CREATE INDEX idx_payments_appointment_id ON payments(appointment_id);

insert into payments (appointment_id, amount, payment_method, payment_status, paid_at)
values
    (1, 1500.00, 'card', 'paid', '2024-03-15 09:45:00'),
    (2, 1200.00, 'upi', 'paid', '2024-03-15 11:15:00'),
    (3, 2000.00, 'cash', 'paid', '2024-03-16 11:45:00'),
    (4, 800.00, 'upi', 'paid', '2024-03-20 10:00:00'),
    (5, 3500.00, 'insurance', 'paid', '2024-03-18 14:45:00'),
    (6, 1800.00, 'card', 'refunded', '2024-03-19 15:30:00'),
    (7, 1200.00, 'upi', 'pending', NULL),
    (8, 1000.00, 'cash', 'pending', NULL);

select * from payments;

---revenue queries
select 
    SUM(amount) as total_revenue
from payments
where payment_status = 'paid';

--revenue per doctor join payment->appointments-> doctors to see

select 
    d.firstname || ' ' || d.lastname AS doctor_name,
    d.specialization,
    count(*) as paid_appointments,
    SUM(pay.amount) AS total_revenue,
    ROUND(AVG(pay.amount), 2) AS average_payment
from payments pay
inner join appointments a on pay.appointment_id = a.id
inner join doctors d on a.doctor_id = d.id
where pay.payment_status = 'paid'
group by d.id, d.firstname, d.lastname, d.specialization
order by total_revenue DESC;

select 
    round(AVG(amount), 2) AS average_payment,
    MIN(amount) AS smallest_payment,
    MAX(amount) AS largest_payment
from payments
where payment_status = 'paid';

select
    payment_method,
    count(*) AS transcation_count,
    SUM(amount) AS total_amount
from payments
where payment_status = 'paid'
group by payment_method
order by total_amount DESC;

-- TEST CASES

select count(*) from payments;
select SUM(amount) from payments where payment_status = 'paid';
select count(*) from payments where payment_status = 'pending';
select count(*) from payments where payment_status = 'refunded;

select count(*) from payments p
LEFT JOIN appointments a on p.appointment_id = a.id
where a.id IS NULL;