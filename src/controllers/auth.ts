import { Request, Response } from "express";
import prisma from "../prismaClient";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { 
            email: email
        },
        include: {
            password: true,
            role: true
        }
    })

    if (!user || !user.password) {
        res.status(404).json({ message: "Invalid credentials" });
        return;
    } 
    if (!compareSync(password, user?.password?.hash)) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    const userPayload = {
        userId: user.id,
        role: user.role?.id
    }

    const token = jwt.sign(userPayload, config.jwtSecret, { expiresIn: '1d' })

    res.status(200).json({
        token: token,
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.id
    })


}
