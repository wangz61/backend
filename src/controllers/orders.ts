import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listOrders = async (req: any, res: Response) => {
    const orders = await prisma.order.findMany({
        include: {
            productions: true
        }
    });

    res.json(orders);
}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    console.log('req.body', req.body.productions);

    if (!Array.isArray(req.body.productions)) {
        res.status(400).json({ error: "productions must be an array of IDs" });
        return;
    }

    const existingProductions = await prisma.production.findMany({
        where: { id: { in: req.body.productions.map(Number) } },
        select: { id: true }
    });

    const validProductionIds = existingProductions.map(p => p.id);

    if (validProductionIds.length === 0) {
        res.status(400).json({ error: "No valid productions found" });
        return;
    }

    const newOrder = await prisma.order.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            totalPrice: req.body.totalPrice,
            productions: {
                connect: validProductionIds.map(id => ({ id }))
            }
        }
    });

    res.status(201).json(newOrder);
};

export const updateOrder = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
        where: { id: id },
    });
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        const updatedOrder = await prisma.order.update({
            where: { id: id },
            data: {
                name: req.body.name,
                productions: {
                    connect: req.body.productions.map((p: string) => ({id: p}))
                }
            }
        });
        res.status(200).json(updatedOrder);
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
        where: { id: id },
    });
    if (!order) {
        res.status(404).json({ message: "Order not found" });
    } else {
        await prisma.order.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "delete order success" });
    }
};