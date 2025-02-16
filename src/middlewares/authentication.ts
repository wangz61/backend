import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const publicRoutes = ['/auth/login']

interface RequestWithUser extends Request {
    userId: number;
    roleId?: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (publicRoutes.includes(req.path)) {
        next();
        return;
    }
    const authenticationHeader = req.header('Authorization')
    const token = authenticationHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    try {
        const decoded: any = jwt.verify(token, config.jwtSecret);
        (req as RequestWithUser).userId = decoded.userId;
        (req as RequestWithUser).roleId = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
};


