interface IPatient {
  id: number;
  name: string;
  age: number;
}

interface IAppointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
}

class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 404;
  }
}

const patients: IPatient[] = [
  { id: 1, name: "Rahul", age: 32 },
  { id: 2, name: "Priya", age: 28 },
];

const appointments: IAppointment[] = [
  { id: 1, patientId: 1, doctorId: 1, date: "2026-07-01", status: "scheduled" },
  { id: 2, patientId: 2, doctorId: 1, date: "2026-07-02", status: "completed" },
];

function fetchPatient(id: number): Promise<IPatient> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patient = patients.find(p => p.id === id);
      if (patient) resolve(patient);
      else reject(new NotFoundError(`Patient with id ${id} not found`));
    }, 500);
  });
}

function fetchAppointments(patientId: number): Promise<IAppointment[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = appointments.filter(a => a.patientId === patientId);
      if (result.length) resolve(result);
      else reject(new NotFoundError(`No appointments for patient ${patientId}`));
    }, 500);
  });
}

async function getPatientDashboard(patientId: number): Promise<{
  patient: IPatient;
  appointments: IAppointment[];
  stats: { total: number; completed: number };
}> {
  const [patient, patientApps] = await Promise.all([
    fetchPatient(patientId),
    fetchAppointments(patientId),
  ]);
  return {
    patient,
    appointments: patientApps,
    stats: {
      total: patientApps.length,
      completed: patientApps.filter(a => a.status === "completed").length,
    },
  };
}

async function getMultiPatientDashboard(patientIds: number[]): Promise<{ patient: IPatient; appointments: IAppointment[]; stats: { total: number; completed: number } }[]> {
  const results = await Promise.allSettled(patientIds.map(id => getPatientDashboard(id)));
  return results.filter(r => r.status === "fulfilled").map(r => (r as PromiseFulfilledResult<any>).value);
}

// Tests
getPatientDashboard(1).then(d => console.log("Dashboard:", d)).catch(e => console.error(e.message));
getPatientDashboard(99).catch(e => console.error("Error:", e.message));
getMultiPatientDashboard([1, 2, 99]).then(d => console.log("Multi:", d));
