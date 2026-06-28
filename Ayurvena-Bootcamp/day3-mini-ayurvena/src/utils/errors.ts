export class AppError extends Error {
    constructor(
        public message : string,
        public statusCode : number =500
    ){
        super(message);
    }
}

export class ValidationError extends AppError {
    constructor(message : string){
        super(message, 400);
    }
}
