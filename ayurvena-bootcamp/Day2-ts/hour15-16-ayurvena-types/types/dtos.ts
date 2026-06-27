export interface AddPatientDto {
    name: string;
    age: number;
    gender: string;
    phone: string;
}
export interface AddDoctorDto {
    name: string;
    department: string;
    experience: number;
}
export interface BookAppointmentDto {
    patientId: number;
    doctorId: number;
    appointmentDate: string;
}