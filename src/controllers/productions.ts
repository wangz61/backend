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

export const getProductionById = async (req: Request, res: Response) => {
    const production = await prisma.production.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if(!production) {
        res.status(404).json({ message: 'Production not found' })
        return
    }
    res.status(200).json(production)
    return
}

export const createProduction = async (req: Request, res: Response) => {
    const newProduction = await prisma.production.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    })
    res.status(201).json(newProduction)
    return
}

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