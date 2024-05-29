const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let clients = await prisma.clientes.findMany()
      let totalRevenue = 0

      if (!clients || clients.length === 0) {
        return undefined;
      }

      clients.forEach((client) => {
        totalRevenue += client.valorPlano
      })

      totalRevenue = totalRevenue.toFixed(2)

      totalRevenue = JSON.stringify(totalRevenue, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return totalRevenue
    } catch (error) {
      error.path = "src/models/mostCommonCity.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
