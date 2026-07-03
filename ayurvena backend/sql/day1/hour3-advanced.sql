CREATE INDEX idx_patients_phone
ON patients(mobile);

CREATE INDEX idx_doctors_specialization
ON doctors(specialization);

CREATE INDEX idx_appointments_patient_id
ON appointments(patient_id);

CREATE INDEX idx_appointments_doctor_id
ON appointments(doctor_id);

CREATE INDEX idx_appointments_date
ON appointments(appointment_date);

EXPLAIN
SELECT *
FROM patients
WHERE mobile = '9876543210';

SELECT
    blood_group,
    COUNT(*) AS patient_count
FROM patients
WHERE blood_group IS NOT NULL
GROUP BY blood_group
ORDER BY patient_count DESC;

SELECT
    blood_group,
    COUNT(*) AS patient_count
FROM patients
WHERE blood_group IS NOT NULL
GROUP BY blood_group
HAVING COUNT(*) > 1
ORDER BY patient_count DESC;

SELECT
    d.department,
    COUNT(*) AS total_appointments,
    COUNT(
        CASE
            WHEN a.status = 'completed' THEN 1
        END
    ) AS completed,
    COUNT(
        CASE
            WHEN a.status = 'scheduled' THEN 1
        END
    ) AS scheduled,
    COUNT(
        CASE
            WHEN a.status = 'cancelled' THEN 1
        END
    ) AS cancelled
FROM appointments a
INNER JOIN doctors d
ON a.doctor_id = d.doctor_id
GROUP BY d.department
ORDER BY total_appointments DESC;

SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    d.specialization,
    d.department,
    COUNT(*) AS appointment_count
FROM doctors d
INNER JOIN appointments a
ON d.doctor_id = a.doctor_id
GROUP BY
    d.doctor_id,
    d.first_name,
    d.last_name,
    d.specialization,
    d.department
ORDER BY appointment_count DESC
LIMIT 3;

SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    COUNT(*) AS completed_appointments
FROM doctors d
INNER JOIN appointments a
ON d.doctor_id = a.doctor_id
WHERE a.status = 'completed'
GROUP BY
    d.doctor_id,
    d.first_name,
    d.last_name
ORDER BY completed_appointments DESC
LIMIT 1;

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER NOT NULL
    REFERENCES appointments(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    payment_status VARCHAR(20)
    DEFAULT 'pending',
    paid_at TIMESTAMP
);

CREATE INDEX idx_payments_appointment_id
ON payments(appointment_id);

INSERT INTO payments
(
    appointment_id,
    amount,
    payment_method,
    payment_status,
    paid_at
)
VALUES
(1,1500.00,'card','paid','2024-03-15 09:45:00'),
(2,1200.00,'upi','paid','2024-03-15 11:15:00'),
(3,2000.00,'cash','paid','2024-03-16 11:45:00'),
(4,800.00,'upi','paid','2024-03-20 10:00:00'),
(5,3500.00,'insurance','paid','2024-03-18 14:45:00'),
(6,1800.00,'card','refunded','2024-03-19 15:30:00'),
(7,1200.00,'upi','pending',NULL),
(8,1000.00,'cash','pending',NULL);

SELECT *
FROM payments;

SELECT
    SUM(amount) AS total_revenue
FROM payments
WHERE payment_status = 'paid';

SELECT
    d.first_name || ' ' || d.last_name AS doctor_name,
    d.specialization,
    COUNT(*) AS paid_appointments,
    SUM(pay.amount) AS total_revenue,
    ROUND(AVG(pay.amount),2) AS average_payment
FROM payments pay
INNER JOIN appointments a
ON pay.appointment_id = a.id
INNER JOIN doctors d
ON a.doctor_id = d.doctor_id
WHERE pay.payment_status = 'paid'
GROUP BY
    d.doctor_id,
    d.first_name,
    d.last_name,
    d.specialization
ORDER BY total_revenue DESC;

SELECT
    d.department,
    SUM(pay.amount) AS department_revenue,
    COUNT(*) AS paid_appointments
FROM payments pay
INNER JOIN appointments a
ON pay.appointment_id = a.id
INNER JOIN doctors d
ON a.doctor_id = d.doctor_id
WHERE pay.payment_status = 'paid'
GROUP BY d.department
ORDER BY department_revenue DESC;

SELECT
    ROUND(AVG(amount),2) AS average_payment,
    MIN(amount) AS minimum_payment,
    MAX(amount) AS maximum_payment
FROM payments
WHERE payment_status = 'paid';

SELECT
    payment_method,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_amount
FROM payments
WHERE payment_status = 'paid'
GROUP BY payment_method
ORDER BY total_amount DESC;

SELECT COUNT(*) AS total_payments
FROM payments;

SELECT SUM(amount) AS total_revenue
FROM payments
WHERE payment_status = 'paid';

SELECT COUNT(*) AS pending_payments
FROM payments
WHERE payment_status = 'pending';

SELECT COUNT(*) AS refunded_payments
FROM payments
WHERE payment_status = 'refunded';

SELECT COUNT(*) AS invalid_payments
FROM payments p
LEFT JOIN appointments a
ON p.appointment_id = a.id
WHERE a.id IS NULL;

