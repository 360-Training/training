import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

console.log('DATABASE_URL =', process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL;

if(!connectionString){
    throw new Error("DATABASE_URL is not defined. Check your .env file.");
}
const pool = new Pool({
    connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("\n PRISMA CRUD DEMO");

    console.log('----CREATE----');
    const newPatient = await prisma.patient.create({
        data: {
            firstName: 'Sriitha', lastName: 'Mulagundla', dateOfBirth: new Date('2000-10-10'), 
            gender: 'Female', bloodGroup: 'O+', phone: '9817294261', 
            email: 'sri@gmail.com', address: '100 Test STreet',
        },
    });
    console.log('Patient is created:', newPatient.id, newPatient.firstName);

    console.log ('\n-----READ-----');
    const patient1 = await prisma.patient.findUnique({where: { id: 1} });
    console.log('Patient 1:', patient1?.firstName, patient1?.lastName);

    const byPhone = await prisma.patient.findUnique({ where: { phone: '9876543201' } });
    console.log('By phone:', byPhone?.firstName);

    const males = await prisma.patient.findMany({ where: { gender: 'Male' } });
    console.log('Male patients:', males.length);

    const completedAppts = await prisma.appointment.findMany({
        where: { status: 'completed' },
        include: {
            patient: { select: { firstName: true, lastName: true } },
            doctor: { select: { firstName: true, lastName: true } },
        },
        orderBy: {appointmentDate: 'asc'},
    });
    console.log("Completed appts:", completedAppts.length);

    const oPositiveMales = await prisma.patient.findMany({
        where: { bloodGroup: 'O+', gender: 'Male' },
    });
    console.log('O+ Males:', oPositiveMales.length);

    const recentAppts = await prisma.appointment.findMany({
        where: { appointmentDate: { gte: new Date('2024-03-20') } },
        orderBy: { appointmentDate: 'asc' },
    });
    console.log('Appts from Mar 20:', recentAppts.length);

    console.log('\n----UPDATE----');
    const updated = await prisma.patient.update({
        where: { id: newPatient.id },
        data: { phone: '9077498002'},
    });
    console.log('Updated phone:', updated.phone);

    console.log('\n----DELETE-----');
    await prisma.patient.delete({ where: { id: newPatient.id } });
    console.log('Deleted test patient');

    console.log('\n----UPSERT----');
    const dept = await prisma.department.upsert({
        where: { name: 'Emergency' },
        update: { floorNumber: 1 },
        create: { name: 'emergency', description: 'Emergency care', floorNumber: 1},
    });
    console.log('Upserted:', dept.name, '(id:',dept.id, ')');

    await prisma.department.deleteMany({ where: { name: 'Emergency' } });
    console.log('\n CRUD demo complete!');
}

main()
   .then(() => prisma.$disconnect())
   .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });