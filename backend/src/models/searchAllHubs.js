const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let hubsSet = new Set()
      let response = await prisma.clientes.findMany()

      response.forEach((client) => {
        hubsSet.add(client.nomeConcentrador)
      })

      let hubs = Array.from(hubsSet)

      hubs = JSON.stringify(hubs, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return hubs
    } catch (error) {
      error.path = "src/models/searchAllHubs.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
