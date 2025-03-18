import { HttpStatus } from "@/shared/HttpStatusCode";

export default class CustomError extends Error {
    public statusCode: HttpStatus;

    constructor(message: string, statusCode: HttpStatus) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ValidationError extends CustomError {
    constructor(message: string = 'Validation Error Occurred', statusCode: HttpStatus = HttpStatus.BadRequest) {
        super(message, statusCode);
    }
}

export class AuthenticationError extends CustomError {
    constructor(message: string = 'Authentication Failed', statusCode: HttpStatus = HttpStatus.Unauthorized) {
        super(message, statusCode);
    }
}

export class AuthorizationError extends CustomError {
    constructor(message: string = 'Forbidden: You do not have permission to access this resource', statusCode: HttpStatus = HttpStatus.Forbidden) {
        super(message, statusCode);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found', statusCode: HttpStatus = HttpStatus.NotFound) {
        super(message, statusCode);
    }
}

export class ConflictError extends CustomError {
    constructor(message: string = 'Conflict Error', statusCode: HttpStatus = HttpStatus.Conflict) {
        super(message, statusCode);
    }
}