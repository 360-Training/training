
interface Patient {
    id: number;
    name: string;
    age: number;
}
interface Doctor {
    id: number;
    name: string;
    department: string;
}
interface Appointment {
    id: number;
    patientName: string;
    doctorName: string;
    date: string;
}
function saveData<T>(data: T): T {
    console.log("Record Saved");
    return data;
}

const patient = saveData<Patient>({
    id: 1,
    name: "Arjun reddy",
    age: 27
});

const doctor = saveData<Doctor>({
    id: 101,
    name: "Dr.prithi",
    department: "General Medicine"
});

const appointment = saveData<Appointment>({
    id: 1001,
    patientName: "Arjun reddy",
    doctorName: "Dr.prithi",
    date: "28-06-2026"
});
console.log(patient);
console.log(doctor);
console.log(appointment);

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
const patientResponse: ApiResponse<Patient> = {
    success: true,
    message: "Patient Registered",
    data: patient
};
console.log(patientResponse);
class Store<T> {
    private list: T[] = [];
    add(item: T) {
        this.list.push(item);
    }
    getAll() {
        return this.list;
    }
}

const patientStore = new Store<Patient>();
patientStore.add({
    id: 2,
    name: "Lakshmi",
    age: 30
});
patientStore.add({
    id: 3,
    name: "Suresh",
    age: 45
});
console.log(patientStore.getAll());

function assignDoctor<P, D>(patient: P, doctor: D) {
    return {
        patient,
        doctor
    };

}
const booking = assignDoctor(patient, doctor);
console.log(booking);

interface Person {
    id: number;
    name: string;
}
function showPerson<T extends Person>(person: T) {
    console.log("ID :", person.id);
    console.log("Name :", person.name);

}
showPerson(patient);
showPerson(doctor);