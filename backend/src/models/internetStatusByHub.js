const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute(hub) {
    try {
      let internetStatus = [0,0,0,0,0,0,0]

      const response = await prisma.clientes.findMany({
        where: {
          nomeConcentrador: hub
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
      error.path = "src/models/internetStatusByHub.js"
      throw error

    } finally {
      await prisma.$disconnect()
    }
  },
}
