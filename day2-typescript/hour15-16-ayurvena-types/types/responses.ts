import {
    IPatient,
    IDoctor,
    IAppointment
} from "./models";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    success: boolean;
    total: number;
    page: number;
    limit: number;
    data: T[];
}

export interface IAdminDashboard {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    totalRevenue: number;
}

export interface IDoctorDashboard {
    doctor: IDoctor;
    todayAppointments: IAppointment[];
}

export interface IReceptionDashboard {
    waitingPatients: IPatient[];
    todayAppointments: IAppointment[];
}