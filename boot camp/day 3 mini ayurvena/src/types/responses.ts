export interface ApiRespose<T> {
  success: OnBeforeUnloadEventHandler;
  data: T;
  message: string;
}

export interface ApiError {
  success: boolean;
  error: string;
  message: string;
}