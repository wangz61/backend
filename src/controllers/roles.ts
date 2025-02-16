import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listRoles = async (req: any, res: Response) => {
    const roles = await prisma.role.findMany({
        include: {
            permissions: true
        }
    });

    res.json(roles);
}

export const createRole = async (req: Request, res: Response) => {
    console.log('req.body', req.body.permissions)
    const newRole = await prisma.role.create({
        data: {
            name: req.body.name,
            permissions: {
                connect: req.body.permissions.map((p: string) => ({name: p}))
            }
        }
    })

    res.status(201).json(newRole)
}

export const updateRole = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const role = await prisma.role.findUnique({
        where: { id: id },
    });
    if (!role) {
        res.status(404).json({ message: "Role not found" });
    } else {
        const updatedRole = await prisma.role.update({
            where: { id: id },
            data: {
                name: req.body.name,
                permissions: {
                    connect: req.body.permissions.map((p: string) => ({name: p}))
                }
            }
        });
        res.status(200).json(updatedRole);
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const role = await prisma.role.findUnique({
        where: { id: id },
    });
    if (!role) {
        res.status(404).json({ message: "Role not found" });
    } else {
        await prisma.role.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "delete role success" });
    }
};