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

export const getOrderById = async (req: Request, res: Response) => {
    const order = await prisma.order.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            productions: true
        }
    })
    if(!order) {
        res.status(404).json({ message: 'Order not found' })
        return
    }
    res.status(200).json(order)
    return
}

export const createOrder = async (req: Request, res: Response) => {
    const newOrder = await prisma.order.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            totalPrice: parseFloat(req.body.totalPrice),
            createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date(),
            productions: {
                connect: req.body.productions.map((productionId: number) => ({ id: productionId }))
            }
        }
    })
    res.status(201).json(newOrder)
    return
}

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