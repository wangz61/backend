import { Request, Response } from "express";
import prisma from "../prismaClient";

export const listProductions = async (req: any, res: Response) => {
    const productions = await prisma.production.findMany({
        include: {
            orders: true
        }
    });

    res.json(productions);
}

export const createProduction = async (req: Request, res: Response): Promise<void> => {
    console.log('req.body', req.body.orders);

    if (!Array.isArray(req.body.orders)) {
        res.status(400).json({ error: "orders must be an array of IDs" });
        return;
    }

    const existingOrders = await prisma.order.findMany({
        where: { id: { in: req.body.orders.map(Number) } },
        select: { id: true }
    });

    const validOrderIds = existingOrders.map(o => o.id);

    if (validOrderIds.length === 0) {
        res.status(400).json({ error: "No valid orders found" });
        return;
    }

    const newProduction = await prisma.production.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            orders: {
                connect: validOrderIds.map(id => ({ id }))
            }
        }
    });

    res.status(201).json(newProduction);
};

export const updateProduction = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const production = await prisma.production.findUnique({
        where: { id: id },
    });
    if (!production) {
        res.status(404).json({ message: "Production not found" });
    } else {
        const updatedProduction = await prisma.production.update({
            where: { id: id },
            data: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
            }
        });
        res.status(200).json(updatedProduction);
    }
};

export const deleteProduction = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const production = await prisma.production.findUnique({
        where: { id: id },
    });
    if (!production) {
        res.status(404).json({ message: "Production not found" });
    } else {
        await prisma.production.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "delete production success" });
    }
};