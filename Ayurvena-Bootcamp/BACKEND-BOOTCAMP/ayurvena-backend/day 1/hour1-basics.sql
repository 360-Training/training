--CREATING PATIENTS TABLE
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    date_of_birth DATE, 
    gender VARCHAR(10), 
    blood_group VARCHAR(5), 
    PHONE VARCHAR(15), 
    email VARCHAR(100),
    address TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--CREATING DOCTORS TABLE
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(200),
    phone VARCHAR(15),
    email VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--CREATING DEPARTMENTS TABLE
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    floor_numebr INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients (firstname, lastname, date_of_birth, gender, blood_group, phone, email, address)
VALUES
    ('Ravi', 'Shankar', '1985-03-15', 'Male', 'B+', '9876543210', 'ravi.shankar@email.com', '42 MG Road, Bangalore'),
    ('Priya', 'Sharma', '1992-07-22', 'Female', 'A+', '9876543211', 'priya.sharma@email.com', '15 Anna Nagar, Chennai'),
    ('Amit', 'Patel', '1978-11-30', 'Male', 'O+', '9876543212', 'amit.patel@email.com', '78 Jubilee Hills, Hyderabad'),
    ('Sunita', 'Reddy', '1990-01-05', 'Female', 'B+', '9876543213', 'sunita.reddy@email.com', '23 Banjara Hills, Hyderabad'),
    ('Vikram', 'Singh', '2000-09-18', 'Male', 'AB-', '9876543214', 'vikram.singh@email.com', '56 Connaught Place, Delhi');

SELECT * FROM patients;

insert into doctors (firstname, lastname, specialization, qualification, phone, email, department)
values 
    ('Anand', 'Krishnan', 'Cardiology', 'MBBS, MD Cardiology', '9988776601', 'dr.anand@hospital.com', 'Cardiology'),
    ('Meera', 'Nair', 'Neurology', 'MBBS, DM Neurology', '9988776602', 'dr.meera@hospital.com', 'Neurology'),
    ('Rajesh', 'Gupta', 'Orthopedics', 'MBBS, MS Orthopedics', '9988776603', 'dr.rajesh@hospital.com', 'Orthopedics');

select * from doctors;

insert into departments (name, description, floor_numebr)
values 
    ('Cardiology', 'Heart and cardiovascular system diagnosis and treatment', 2),
    ('Neurology', 'Brain, spinal cord, and nervous system disorders', 3),
    ('Orthopedics', 'Bones, joints, muscles, and skeletal system', 1),
    ('Emergency', 'Immediate care for life-threatening conditions and injuries', 0);

select * from departments;

select * from patients;
select firstname, lastname, blood_group from patients;
select firstname, lastname, phone from patients where blood_group = 'B+';

select firstname, lastname, specialization from doctors where department = 'Cardiology';
select name, floor_numebr from departments where floor_numebr >= 2;
select firstname, lastname from patients where lastname like 'S%';

--TEST CASES

select count(*) from patients;
select count(*) from patients where blood_group = 'B+';
select count(*) from doctors;
select count(*) from departments;
select count(*) from patients where firstname is NULL;
insert into departments (name, description, floor_numebr)
values ('Cardiology', 'Duplicate test', 5);