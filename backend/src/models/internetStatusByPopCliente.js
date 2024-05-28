const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute(popCliente) {
    try {
      let internetStatus = [0,0,0,0,0,0,0]

      const response = await prisma.clientes.findMany({
        where: {
          popCliente: popCliente
        }
      })

      response.forEach((client) => {
        internetStatus[client.statusInternet] += 1
      })

      internetStatus = JSON.stringify(internetStatus, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );

      return internetStatus
    } catch (error) {
      error.path = "src/models/internetStatusByPopCliente.js"
      throw error

    } finally {
      await prisma.$disconnect()
    }
  },
}
