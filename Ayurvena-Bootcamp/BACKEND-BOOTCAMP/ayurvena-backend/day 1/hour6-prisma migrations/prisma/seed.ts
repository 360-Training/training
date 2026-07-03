// prisma/seed.ts - Populates database with sample data
// Run: npx prisma db seed

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(' Starting seed...');

  // 1. Create Departments (8)
  const departments = [
    { name: 'Cardiology', description: 'Heart and cardiovascular system', floorNumber: 1 },
    { name: 'Neurology', description: 'Brain and nervous system', floorNumber: 2 },
    { name: 'Orthopedics', description: 'Bones, joints, and muscles', floorNumber: 3 },
    { name: 'Pediatrics', description: 'Medical care for children', floorNumber: 2 },
    { name: 'General Medicine', description: 'Primary care and internal medicine', floorNumber: 1 },
    { name: 'Dermatology', description: 'Skin, hair, and nails', floorNumber: 3 },
    { name: 'Ophthalmology', description: 'Eye care and vision', floorNumber: 4 },
    { name: 'ENT', description: 'Ear, nose, and throat', floorNumber: 4 },
  ];

  for (const dept of departments) {
    // upsert: if name exists, skip; otherwise create
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
  }
  console.log(`✅ ${departments.length} departments created`);

  // 2. Create Doctors (5) - need department IDs first
  const cardio = await prisma.department.findUnique({ where: { name: 'Cardiology' } });
  const neuro = await prisma.department.findUnique({ where: { name: 'Neurology' } });
  const ortho = await prisma.department.findUnique({ where: { name: 'Orthopedics' } });
  const pedia = await prisma.department.findUnique({ where: { name: 'Pediatrics' } });
  const general = await prisma.department.findUnique({ where: { name: 'General Medicine' } });

  const doctors = [
    { firstName: 'Dr. Suresh', lastName: 'Iyer', specialization: 'Cardiologist', qualification: 'MBBS, MD, DM Cardiology', phone: '9988776651', email: 'suresh.iyer@ayurvena.com', departmentId: cardio!.id },
    { firstName: 'Dr. Lakshmi', lastName: 'Devi', specialization: 'Neurologist', qualification: 'MBBS, MD, DM Neurology', phone: '9988776652', email: 'lakshmi.devi@ayurvena.com', departmentId: neuro!.id },
    { firstName: 'Dr. Rajesh', lastName: 'Gupta', specialization: 'Orthopedic Surgeon', qualification: 'MBBS, MS Orthopedics', phone: '9988776653', email: 'rajesh.gupta@ayurvena.com', departmentId: ortho!.id },
    { firstName: 'Dr. Ananya', lastName: 'Menon', specialization: 'Pediatrician', qualification: 'MBBS, MD Pediatrics', phone: '9988776654', email: 'ananya.menon@ayurvena.com', departmentId: pedia!.id },
    { firstName: 'Dr. Venkat', lastName: 'Rao', specialization: 'General Physician', qualification: 'MBBS, MD Internal Medicine', phone: '9988776655', email: 'venkat.rao@ayurvena.com', departmentId: general!.id },
  ];

  for (const doc of doctors) {
    await prisma.doctor.upsert({ where: { phone: doc.phone }, update: {}, create: doc });
  }
  console.log(`✅ ${doctors.length} doctors created`);

  // 3. Create Patients (20)
  const patients = [
    { firstName: 'Ravi', lastName: 'Kumar', dateOfBirth: new Date('1985-06-15'), gender: 'Male', bloodGroup: 'O+', phone: '9876543201', email: 'ravi.kumar@email.com', address: '123 Main St, Bangalore' },
    { firstName: 'Priya', lastName: 'Sharma', dateOfBirth: new Date('1992-03-22'), gender: 'Female', bloodGroup: 'A+', phone: '9876543202', email: 'priya.sharma@email.com', address: '456 Park Ave, Bangalore' },
    { firstName: 'Amit', lastName: 'Patel', dateOfBirth: new Date('1978-11-08'), gender: 'Male', bloodGroup: 'B+', phone: '9876543203', email: 'amit.patel@email.com', address: '789 Lake Rd, Bangalore' },
    { firstName: 'Sunita', lastName: 'Reddy', dateOfBirth: new Date('1995-09-30'), gender: 'Female', bloodGroup: 'AB+', phone: '9876543204', email: 'sunita.reddy@email.com', address: '321 Hill View, Bangalore' },
    { firstName: 'Vijay', lastName: 'Singh', dateOfBirth: new Date('1988-02-14'), gender: 'Male', bloodGroup: 'A-', phone: '9876543205', email: 'vijay.singh@email.com', address: '654 River Side, Bangalore' },
    { firstName: 'Neha', lastName: 'Joshi', dateOfBirth: new Date('1990-07-18'), gender: 'Female', bloodGroup: 'B-', phone: '9876543206', email: 'neha.joshi@email.com', address: '789 Garden Ln, Bangalore' },
    { firstName: 'Arun', lastName: 'Nair', dateOfBirth: new Date('1982-12-25'), gender: 'Male', bloodGroup: 'O-', phone: '9876543207', email: 'arun.nair@email.com', address: '159 Beach Rd, Bangalore' },
    { firstName: 'Deepa', lastName: 'Iyer', dateOfBirth: new Date('1998-04-10'), gender: 'Female', bloodGroup: 'AB-', phone: '9876543208', email: 'deepa.iyer@email.com', address: '753 Lake View, Bangalore' },
    { firstName: 'Karthik', lastName: 'Rajan', dateOfBirth: new Date('1975-08-30'), gender: 'Male', bloodGroup: 'A+', phone: '9876543209', email: 'karthik.rajan@email.com', address: '951 Park St, Bangalore' },
    { firstName: 'Meera', lastName: 'Chopra', dateOfBirth: new Date('2000-01-05'), gender: 'Female', bloodGroup: 'B+', phone: '9876543210', email: 'meera.chopra@email.com', address: '357 Mall Rd, Bangalore' },
    { firstName: 'Suresh', lastName: 'Kamath', dateOfBirth: new Date('1986-05-20'), gender: 'Male', bloodGroup: 'O+', phone: '9876543211', email: 'suresh.kamath@email.com', address: '852 Ring Rd, Bangalore' },
    { firstName: 'Anita', lastName: 'Desai', dateOfBirth: new Date('1993-09-12'), gender: 'Female', bloodGroup: 'A-', phone: '9876543212', email: 'anita.desai@email.com', address: '963 Hill Rd, Bangalore' },
    { firstName: 'Rahul', lastName: 'Verma', dateOfBirth: new Date('1980-02-28'), gender: 'Male', bloodGroup: 'AB+', phone: '9876543213', email: 'rahul.verma@email.com', address: '147 MG Rd, Bangalore' },
    { firstName: 'Pooja', lastName: 'Gupta', dateOfBirth: new Date('1996-11-15'), gender: 'Female', bloodGroup: 'B-', phone: '9876543214', email: 'pooja.gupta@email.com', address: '258 Residency Rd, Bangalore' },
    { firstName: 'Manoj', lastName: 'Pillai', dateOfBirth: new Date('1972-06-08'), gender: 'Male', bloodGroup: 'O+', phone: '9876543215', email: 'manoj.pillai@email.com', address: '369 Church St, Bangalore' },
    { firstName: 'Latha', lastName: 'Srinivas', dateOfBirth: new Date('1989-03-25'), gender: 'Female', bloodGroup: 'A+', phone: '9876543216', email: 'latha.srinivas@email.com', address: '741 Brigade Rd, Bangalore' },
    { firstName: 'Ganesh', lastName: 'Murthy', dateOfBirth: new Date('1976-10-02'), gender: 'Male', bloodGroup: 'B+', phone: '9876543217', email: 'ganesh.murthy@email.com', address: '852 Double Rd, Bangalore' },
    { firstName: 'Sneha', lastName: 'Kapoor', dateOfBirth: new Date('1999-07-19'), gender: 'Female', bloodGroup: 'AB-', phone: '9876543218', email: 'sneha.kapoor@email.com', address: '963 Koramangala, Bangalore' },
    { firstName: 'Dinesh', lastName: 'Shetty', dateOfBirth: new Date('1983-12-11'), gender: 'Male', bloodGroup: 'O-', phone: '9876543219', email: 'dinesh.shetty@email.com', address: '159 Indiranagar, Bangalore' },
    { firstName: 'Kavita', lastName: 'Nambiar', dateOfBirth: new Date('1991-08-05'), gender: 'Female', bloodGroup: 'A+', phone: '9876543220', email: 'kavita.nambiar@email.com', address: '357 Whitefield, Bangalore' },
  ];

  for (const p of patients) {
    await prisma.patient.upsert({ where: { phone: p.phone }, update: {}, create: p });
  }
  console.log(`✅ ${patients.length} patients created`);

  // 4. Create Appointments (13)
  const allPatients = await prisma.patient.findMany();
  const allDoctors = await prisma.doctor.findMany();

  const appts : [number, number, string, string, string, string][] = [
    [0, 0, '2024-03-15', '09:00', 'completed', 'Chest pain and shortness of breath'],
    [1, 1, '2024-03-15', '10:00', 'completed', 'Recurring headaches'],
    [2, 2, '2024-03-16', '11:00', 'completed', 'Right knee pain since 2 months'],
    [0, 0, '2024-03-20', '09:00', 'completed', 'Follow-up on chest pain treatment'],
    [3, 4, '2024-03-20', '14:00', 'completed', 'Annual health checkup'],
    [4, 0, '2024-03-22', '09:30', 'scheduled', 'Heart evaluation and ECG'],
    [1, 1, '2024-03-25', '10:00', 'scheduled', 'Follow-up headache assessment'],
    [2, 1, '2024-03-25', '11:30', 'scheduled', 'Nerve pain in left leg'],
    [5, 4, '2024-03-26', '09:00', 'scheduled', 'Fever and cough'],
    [6, 0, '2024-03-26', '10:00', 'scheduled', 'Chest discomfort'],
    [7, 4, '2024-03-27', '11:00', 'scheduled', 'General weakness'],
    [8, 2, '2024-03-27', '14:00', 'scheduled', 'Lower back pain'],
    [9, 4, '2024-03-28', '09:00', 'scheduled', 'Routine checkup'],
  ];

  for (const [pIdx, dIdx, date, time, status, reason] of appts) {
    await prisma.appointment.create({
      data: {
        patientId: allPatients[pIdx]!.id,
        doctorId: allDoctors[dIdx]!.id,
        appointmentDate: new Date(date),
        appointmentTime: time,
        status,
        reason,
      },
    });
  }
  console.log(`✅ ${appts.length} appointments created`);

  // 5. Create Consultations & Prescriptions
  const completed = await prisma.appointment.findMany({
    where: { status: 'completed' },
    orderBy: { id: 'asc' },
  });


  const diagnoses = ['Mild angina - stable', 'Tension-type headache', 'Mild osteoarthritis - right knee', 'Angina - improving', 'Normal cardiac function'];
  const notesList = ['ECG shows minor ST changes.', 'No neurological deficits.', 'X-ray shows mild joint space narrowing.', 'Reduced chest pain frequency.', 'All cardiac markers normal.'];
  const symptomsList = ['Chest pain, SOB', 'Bilateral headache', 'Right knee pain, stiffness', 'Occasional chest discomfort', 'No symptoms - routine'];

  for (let i = 0; i < Math.min(completed.length, diagnoses.length); i++) {
    let c = await prisma.consultation.findUnique({
      where: {
        appointmentId: completed[i]!.id,
      }
    })
    if (!c) {
      c = await prisma.consultation.create({
        data: {
          appointmentId: completed[i]!.id,
          diagnosis: diagnoses[i]!,
          notes: notesList[i]!,
          symptoms: symptomsList[i]!,
          vitals: 'BP: 120/80, Pulse: 72',
          followUpDate: i === 0 ? new Date('2024-03-20') : null,
          followUpNotes: i === 0 ? 'Follow-up ECG recommended' : null,
        },
      });
    }
    const meds = [
      [
        { medicineName: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'After breakfast' },
        { medicineName: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at night', duration: '30 days', instructions: 'At bedtime' },
      ],
      [
        { medicineName: 'Paracetamol', dosage: '500mg', frequency: 'Twice daily', duration: '5 days', instructions: 'After food' },
      ],
      [
        { medicineName: 'Diclofenac', dosage: '50mg', frequency: 'Twice daily', duration: '7 days', instructions: 'After food' },
        { medicineName: 'Calcium + D3', dosage: '500mg', frequency: 'Once daily', duration: '30 days', instructions: 'After lunch' },
      ],
      [
        { medicineName: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: '30 days', instructions: 'Continue as before' },
        { medicineName: 'Metoprolol', dosage: '25mg', frequency: 'Once daily', duration: '30 days', instructions: 'Monitor pulse' },
      ],
      [],
    ];

    for (const med of meds[i] || []) {
      await prisma.prescription.create({
        data: { consultationId: c.id, ...med },
      });
    }
  }
  console.log(`✅ ${completed.length} consultations with prescriptions created`);

  // 6. Create Payments
  const paymentData = [
    { idx: 0, amount: 500.00, method: 'card' },
    { idx: 1, amount: 350.00, method: 'cash' },
    { idx: 2, amount: 450.00, method: 'upi' },
    { idx: 3, amount: 300.00, method: 'insurance' },
    { idx: 4, amount: 1000.00, method: 'card' },
  ];

  for (const pay of paymentData) {
    await prisma.payment.create({
      data: {
        appointmentId: completed[pay.idx]!.id,
        amount: pay.amount,
        paymentMethod: pay.method,
        paymentStatus: 'paid',
      },
    });
  }
  console.log(`✅ ${paymentData.length} payments created`);
  // 7. Create Medical Records
const medicalRecords = [
  {
    patientId: allPatients[0]!.id,
    recordType: "Lab Report",
    title: "Complete Blood Count",
    description: "Blood test results are normal.",
    attachments: "blood_report.pdf",
    recordedBy: allDoctors[0]!.id,
    recordDate: new Date("2024-03-15"),
  },
  {
    patientId: allPatients[1]!.id,
    recordType: "X-Ray",
    title: "Chest X-Ray",
    description: "Chest X-Ray shows no abnormalities.",
    attachments: "chest_xray.pdf",
    recordedBy: allDoctors[1]!.id,
    recordDate: new Date("2024-03-16"),
  },
  {
    patientId: allPatients[2]!.id,
    recordType: "MRI",
    title: "Brain MRI",
    description: "MRI scan is normal.",
    attachments: "brain_mri.pdf",
    recordedBy: allDoctors[2]!.id,
    recordDate: new Date("2024-03-17"),
  },
  {
    patientId: allPatients[3]!.id,
    recordType: "ECG",
    title: "ECG Report",
    description: "Normal sinus rhythm.",
    attachments: "ecg_report.pdf",
    recordedBy: allDoctors[0]!.id,
    recordDate: new Date("2024-03-18"),
  },
  {
    patientId: allPatients[4]!.id,
    recordType: "Prescription",
    title: "General Prescription",
    description: "Prescribed medicines for follow-up treatment.",
    attachments: "prescription.pdf",
    recordedBy: allDoctors[4]!.id,
    recordDate: new Date("2024-03-19"),
  },
];

for (const record of medicalRecords) {
  await prisma.medicalRecord.create({
    data: record,
  });
}

console.log(`✅ ${medicalRecords.length} medical records created`);
  console.log('🎉 Seed completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { 
    console.error(e);
    prisma.$disconnect();
   });

