import { Request, Response } from "express";
import prisma from "../prismaClient";
import { hashSync } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    const newUser = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            role: {
                connect: {
                    id: req.body.roleId
                }
            },
            password: {
                create: {
                    hash: hashSync(req.body.password)
                }
            }
        }
    })
    res.status(201).json(newUser);
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
}

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    } else {
        res.status(200).json(user);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    } else {
        await prisma.password.deleteMany({
            where: { userId: id },
        });
        await prisma.user.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "delete user success" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    } else {
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                name: req.body.name,
                email: req.body.email,
                role: {
                    connect: { id: req.body.roleId }
                }
            }
        });
        res.status(200).json(updatedUser);
    }
};

