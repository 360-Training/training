import {
    IPatient,
    IDoctor,
    IAppointment
} from "./models";

//----Generic API Response----

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

//----Generic List Response----

export interface ListResponse<T> {
    success: boolean;
    count: number;
    data: T[];
}

//----Error Response----

export interface ErrorResponse {
    success: boolean;
    message: string;
    errors: string[];
}

//----Dashboard Interfaces----

export interface IAdminDashboard {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    totalRevenue: number;
}
export interface IDoctorDashboard {
    doctor: IDoctor;
    todayAppointments: IAppointment[];
    completedAppointments: number;
}
export interface IReceptionDashboard {
    todayPatients: IPatient[];
    waitingCount: number;
}