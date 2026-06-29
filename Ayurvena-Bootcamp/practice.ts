interface IPatient {
    id : number;
    name : string;
    age : number;
}
interface IAppointment {
    id : number;
    patientId : number;
    doctorId : number;
    date : string;
    status : "completed" | "pending" | "cancelled";
}
const patients : IPatient[] = [
    {id : 1, name : "sri", age : 20},
    {id : 2, name : "bob", age : 35}
];
const appointments : IAppointment[] = [
    {id : 101, patientId : 1, doctorId : 201, date : "2026-06-20", status : "completed"},
    {id : 102, patientId : 1, doctorId : 202, date : "2026-06-16", status : "pending"},
    {id : 103, patientId : 2, doctorId : 201, date : "2026-06-10", status : "completed"}
];
class NotFoundError extends Error {
    statusCode = 404;
    constructor(message : string){
        super(message);
        this.name = "NotFoundError";
    }
}
class ValidationError extends Error {
    statusCode = 400,
    constructor(message : string) {
        super(message);
        this.name = "ValidationError";
    }
}
function fetchPatient(id : number): Promise<IPatient> {
    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            const patient = patients.find((p) => p.id === id);
            if (patient) {
                resolve(patient);
            }
            else {
                reject(new NotFoundError('Patient with id ${id} not found'));
            }
        }, 500);
    })
}
function fetchAppointments(patientId : number): Promise<IAppointment[]> {
    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            const appts = appointments.find((a) => a.patientId === patientId);
            if (appts.length > 0) {
                resolve(appts);
            }
            else {
                reject(new NotFoundError('No Appointments found for patientId ${patientId}'));
            }
        }, 500);
    })
}

async function getPatientDashboard(patientId: number) {
    const [ patient, appts] = await Promise.all([
        fetchPatient(patientId),
        fetchAppointments(patientId)
    ]);
    return {
        patient,
        appointments : appts,
        status : {
            total : appts.length,
            completed : appts.filter((a) => a.status === "completed").length,
        },
    };
}
