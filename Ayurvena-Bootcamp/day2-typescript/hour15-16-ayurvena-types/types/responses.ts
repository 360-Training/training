export interface ApiResponse<T> {
    success : boolean;
    data : T;
    message : string;
    statusCode : number;
}
export interface ApiError {
    success : false;
    error : string;
    message : string;
    statusCode : number;
}
export interface PaginatedResponse<T> {
    success : boolean;
    count : number;
    data : T[];
}
export interface Searchresponse<T> {
    success : boolean;
    keyword : string;
    results : T[];
}
export interface DashboardResponse<T> {
    success : boolean;
    data : T;
    generateAt : Date;
}

