const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let clients = await prisma.clientes.findMany()
      let totalTimeInSeconds = 0

      if (!clients || clients.length === 0) {
        return undefined;
      }

      clients.forEach((client) => {
        totalTimeInSeconds += client.tempoConectado
      })

      let totalTimeInMinutes = totalTimeInSeconds / 60

      let average = (totalTimeInMinutes / clients.length).toFixed(2)

      average = JSON.stringify(average, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return average
    } catch (error) {
      error.path = "src/models/mostCommonCity.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
