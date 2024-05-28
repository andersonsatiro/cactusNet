const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let popClientesSet = new Set()
      let response = await prisma.clientes.findMany()

      response.forEach((client) => {
        popClientesSet.add(client.popCliente)
      })

      let popClientes = Array.from(popClientesSet)

      popClientes = JSON.stringify(popClientes, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return popClientes
    } catch (error) {
      error.path = "src/models/searchAllPopClientes.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
