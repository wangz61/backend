import { faker } from "@faker-js/faker"
import { Production } from "@prisma/client"
import prisma from "../prismaClient"


const populateOrders = async () => {
    const productions = await prisma.production.findMany()

    const orders = new Array(30).fill(null).map(() => {

        const orderProductions: Production[] = faker.helpers.arrayElements(productions, { min: 1, max: 5 })

        const total = orderProductions.reduce((acc, production) => acc + production.price, 0) // sum of products price

        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            total: total,
            createdAt: faker.date.recent({days: 7}),
            productions: orderProductions,
        }
    })

    await Promise.all(orders.map(async (order) => {
        await prisma.order.create({
            data: {
                name: order.name,
                email: order.email,
                totalPrice: order.total,
                createdAt: order.createdAt,
                productions: {
                    connect: order.productions.map((production) => ({ id: production.id }))
                }
            }
        })
    }))
    console.log('Orders created')
    return 
}

populateOrders()
