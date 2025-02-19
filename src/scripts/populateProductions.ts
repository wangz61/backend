import { faker } from "@faker-js/faker"
import prisma from "../prismaClient"

const populateProductions = async () => {
    const productions = new Array(30).fill(0).map(() => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
        }
    })
    console.log(productions)
    await prisma.production.createMany({
        data: productions,
        skipDuplicates: true
    })
    console.log("Productions created successfully")
}

populateProductions()

