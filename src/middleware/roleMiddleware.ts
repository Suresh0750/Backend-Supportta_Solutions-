import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/shared/CustomeRequest';
import { HttpStatus } from '@/shared/HttpStatusCode';

export const authorizeRole = (requiredRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
        console.log(req.user,'req.user  ')
        if (!req.user) {
             res.status(HttpStatus.Unauthorized).json({ message: 'Unauthorized' });
             return
        }
        console.log(requiredRoles)
        if (!requiredRoles.includes(req.user.role)) {
             res.status(HttpStatus.Forbidden).json({ message: 'Forbidden: Insufficient permissions' });
             return
        }

        next(); 
    };
};
