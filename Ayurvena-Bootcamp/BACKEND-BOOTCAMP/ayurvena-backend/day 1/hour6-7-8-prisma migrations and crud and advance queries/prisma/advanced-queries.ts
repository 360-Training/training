import 'dotenv/config';
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
    console.log('PRISMA ADVANCED QUERIES\n');

    // pagination 
    console.log('-----PAGINATION-------\n');
    const page1 = await prisma.patient.findMany({
        take: 5, skip: 0, orderBy: {lastName: 'asc' },
        select: { id: true, firstName: true, lastName: true, phone: true},
    });
    console.log('Page 1:', page1.length, 'patients');

    const page2 = await prisma.patient.findMany({
        take: 5, skip: 5, orderBy: {lastName: 'asc'},
        select: { id: true, firstName: true, lastName: true, phone: true},
    });
    console.log('Page 2:', page2.length, 'patients');

    // aggregation - revenue stats
    console.log('\n----REVENUE STATS----');
    const stats = await prisma.payment.aggregate({
        _sum: { amount: true},
        _avg: { amount: true},
        _count: true,
        _max: { amount: true},
        _min: { amount: true},
    });
    console.log('Total revenue:', stats._sum.amount);
    console.log('Average payment:', Number(stats._avg.amount).toFixed(2));
    console.log('Transcations:', stats._count);

    // group by - revenue by method
    console.log('\n----REVENUE BY METHOD-----');
    const byMethod = await prisma.payment.groupBy({
        by: ['paymentMethod'],
        _sum: {amount: true},
        _count: true,
        orderBy: {_sum: { amount: 'desc' } },
    });
    byMethod.forEach(r => console.log(' ${r.paymentMethod}: ₹${r._sum.amount} (${r._count} txns)'));

    // group by - revenue by appointment by status
    console.log('\n----APPOINTMENTS BY STATUS-----');
    const byStatus = await prisma.appointment.groupBy({
        by: ['status'],
        _count: true,
        orderBy: {_count: { id: 'desc' } },
    });
    byStatus.forEach(a => console.log(' ${a.status}: ${a._count}'));

    //nested includes - patient full history
    console.log('\n-----PATIENT FULL HISTORY-------');
    const history = await prisma.patient.findUnique({
        where: { id: 1},
        include: {
            appointments: {
                include: {
                    doctor: { include: { department: true } },
                    consultation: { include: { prescriptions: true } },
                    payments: true,
                },
                orderBy: { appointmentDate: 'desc' },
            },
            medicalRecords: { orderBy: { recordDate: 'desc' } },
        },
    });

    console.log('Patient: ${history?.firstName} ${history?.lastName}');
    for (const apt of history?.appointments || []){
        console.log(`${apt.appointmentDate.toISOString().split('T')[0]} - Dr. ${apt.doctor.firstName} ${apt.doctor.lastName} (${apt.doctor.department.name})`);
        if (apt.consultation) console.log(`Diagnosis: ${apt.consultation.diagnosis}`);
        if (apt.payments.length) apt.payments.forEach(p => console.log(`Paid: ₹${p.amount}`));
    }

    // doctor workload
    console.log('\n------DOCTOR WORKLOAD------');
    const doctors = await prisma.doctor.findMany({
        include: {
            department: true,
            _count: { select: { appointments: true } },
        },
    });
    doctors.forEach(d => console.log(`Dr. ${d.firstName} (${d.department.name}): ${d._count.appointments} appointments`));

    // raw sql ( when prisma is not enough)
    console.log('\n----RAW SQL-----');
    const raw = await prisma.$queryRaw`
    SELECT d.first_name || ' ' || d.last_name AS name,
           dep.name AS dept,
           COUNT(a.id) AS appts,
           COALESCE(SUM(pay.amount), 0) AS revenue
    FROM doctors d
    JOIN departments dep ON d.department_id = dep.id
    LEFT JOIN appointments a ON d.id = a.doctor_id
    LEFT JOIN payments pay ON a.id = pay.appointment_id
    GROUP BY d.id, dep.name
    ORDER BY revenue DESC
  `;
   for (const r of raw as any[]) console.log(`  Dr. ${r.name} (${r.dept}): ${r.appts} appts, ₹${r.revenue}`);
   console.log('\nAdvanced queries complete!');
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });