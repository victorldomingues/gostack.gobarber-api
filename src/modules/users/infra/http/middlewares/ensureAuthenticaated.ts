import { Response, Request, NextFunction } from "express";
import jwtService from "@modules/users/services/jwt.service";
import AppError from "@shared/errors/AppError";
export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError('JWT token is missing');
    const [, token] = authHeader.split(' ')
    try {
        const { sub } = jwtService.verify(token);
        request.user = {
            id: sub
        };
        return next();
    } catch{
        throw new AppError('JWT token invalid');
    }
};