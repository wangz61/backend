import { Request, Response, NextFunction } from "express";
import prisma from "../prismaClient";

export const authorize = (targetPermissions: string[]) => {
    return async (req: any, res: Response, next: NextFunction) => {
        console.log('req.userId, req.roleId', req.userId, req.roleId)

        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        })

        if(!user) {
            res.status(401).send('Unauthorized')
            return
        }
        
        const allowedPermissions = user.role?.permissions.map(p => p.name)
        console.log("✅ 用户拥有的权限:", allowedPermissions);
        console.log("✅ 目标权限:", targetPermissions);
        if(allowedPermissions?.some(p => targetPermissions.includes(p))) {
            next()
            return
        }

        res.status(401).send('Unauthorized')
        return
    }
}