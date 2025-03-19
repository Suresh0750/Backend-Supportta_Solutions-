import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/constants'
import { AuthenticatedRequest } from '@/shared/CustomeRequest'
import { AuthenticationError, AuthorizationError } from '@/shared/CustomError'

export class JwtService {
    async createToken(user: Object | undefined, role: string): Promise<string | undefined>{
        try {
            const syncToken = await jwt.sign(
                { user, role },
                String(JWT_SECRET),
                { expiresIn: '15m' }
            )
            return syncToken
        } catch (error: unknown) {
            console.error(error)
            throw error
        }
    }

    async createRefreshToken(user: Object | undefined, role: string): Promise<string | undefined> {
        try {
            const syncToken = await jwt.sign(
                { user, role },
                String(JWT_SECRET),
                { expiresIn: '7d' }
            )
            return syncToken
        } catch (error: unknown) {
            console.error(error)
            throw error
        }
    }

    // *Expiration verifyToken
    async isTokenExpired (token: string): Promise<boolean | null> {
        try {
            const decodedToken: any = jwt.decode(token)
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp < currentTime
        } catch (error) {
            console.log("Error in access token expiry Check :", error);
            throw new Error("user not authorised");
        }
    }
    async verifyToken(token: string): Promise<JwtPayload | null> {
        try {
            if (!token) {
                throw new Error("Token is required"); 
            }
            
            return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        } catch (error: any) {
            console.error("Token verification error:", error.message);

            if (error.name === "TokenExpiredError") {
                throw new AuthenticationError("Token has expired"); 
            } 
            if (error.name === "JsonWebTokenError") {
                throw new AuthorizationError("Invalid token"); 
            } 
            if (error.name === "SyntaxError") {
                throw new Error("Malformed token");
            }
            
            throw new Error("Internal server error");
        }
    }
}