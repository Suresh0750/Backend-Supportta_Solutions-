import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { JWT_SECRET } from '../utils/constants';
import { AuthenticatedRequest } from '../shared/CustomeRequest';
import { Token } from '../utils/constants';
import { HttpStatus } from '../shared/HttpStatusCode';

const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {

    const accessToken = req.cookies[Token.AccessToken];
    const refreshToken = req.cookies[Token.RefreshToken];


    if (!accessToken) {
        return res.status(HttpStatus.Unauthorized).json({ failToken: true, message: 'No access token provided' });
    }

    try {
        // * Verify Access Token
        const accessPayload = await jwt.verify(accessToken, JWT_SECRET as string) as AuthenticatedRequest['user'];

        // * Attach payload to request and proceed
        req.user = accessPayload;
        return next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            // console.log('Access token expired');

            if (!refreshToken) {
                // console.log('No refresh token provided');
                return res.status(HttpStatus.Unauthorized).json({ failToken: true, message: 'No refresh token provided' });
            }

            try {
                // * Verify Refresh Token
                const refreshPayload = await jwt.verify(refreshToken, JWT_SECRET as string) as AuthenticatedRequest['user'] ;
                if (!refreshPayload) {
                    return res.status(HttpStatus.Unauthorized).json({ message: 'Invalid refresh token. Please log in.' });
                }

                // * Generate a new Access Token
                const newAccessToken = jwt.sign(
                    { user:refreshPayload?.user, role: refreshPayload.role },
                    JWT_SECRET as string,
                    { expiresIn: '15m' }
                );
                // * Set new Access Token in cookies
                res.cookie(Token.AccessToken, newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                // * Attach payload to request
                req.user = refreshPayload;
                return next();
            } catch (refreshErr) {
                if (refreshErr instanceof jwt.TokenExpiredError) {
                    return res.status(HttpStatus.Unauthorized).json({ message: 'Session expired. Please log in again.' });
                }

                return res.status(HttpStatus.Unauthorized).json({ message: 'Invalid refresh token. Please log in.' });
            }
        }


        return res.status(HttpStatus.BadRequest).json({ message: 'Invalid access token. Please log in.' });
    }
};

export default authenticateToken;

