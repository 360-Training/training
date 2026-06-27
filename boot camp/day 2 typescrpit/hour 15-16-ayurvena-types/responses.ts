export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
}

export interface IAdminDashboard {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRevenue: number;
}

export interface IDoctorDashboard {
  todayAppointments: number;
  totalPatients: number;
}

export interface IReceptionDashboard {
  waitingPatients: number;
  todayAppointments: number;
}