import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '@/shared/HttpStatusCode';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = HttpStatus.InternalServerError, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

// Global Error Handler Middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error("Error: ", err.message);

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err.statusCode || HttpStatus.InternalServerError
    });
};
