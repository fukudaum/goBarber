
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "shared/errors/AppErrors";
require('dotenv').config();

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

declare global {
    namespace Express {
        interface Request {
        user?: {
            id: string
        }
        }
    }
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        throw new AppError('JWT token is missing!', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const secret = process.env.SECRET;
        if(secret) {
            const decoded = verify(token, secret);

            const { sub } = decoded as TokenPayload;

            request.user = {
                id: sub,
            };

            return next();
        }
        throw new AppError('Invalid JWT token', 401);
    } catch (error) {
        throw new AppError('Invalid JWT token', 401);
    }
}

