import type{
  IPatient,
  Idoctor,
  IAppontiment
} from "./models.js";

export interface ApiResponse<T>{
  success:boolean;
  data:T;
  message:string;
  statusCode:number;
}

export interface ApiError{
  success:false;
  error:string;
  message:string;
  statuscode:number;
}

export interface PaginatedResponse<T>{
  success:boolean;
  data:T[];
  pagination:{
    page:number;
    limit:number;
    total:number;
    totalPages:number;
  };
}

export interface IAdminDashboard{
  totalPatients:number;
  totalDoctors:number;
  totalAppointments:number;
  totalRevenue:number;
}

export interface IDoctorDashboard{
  doctor:Idoctor;
  todayAppointments:IAppontiment[];
  totalPatient:number;
  earnings:number;
}

export interface IReceptionDashboard{
  todayAppointments:IAppontiment[];
  waitingPatients:IPatient[];
  checkedInPatients:number;
}