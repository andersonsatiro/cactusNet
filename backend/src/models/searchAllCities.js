const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      let citiesSet = new Set()
      let response = await prisma.clientes.findMany();

      response.forEach((client) => {
        citiesSet.add(client.cidadeCliente)
      })

      let cities = Array.from(citiesSet)

      cities = JSON.stringify(cities, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return cities
    } catch (error) {
      error.path = "src/models/searchAllCities.js"
      throw error
      // ... tratamento de erros ...
    } finally {
      await prisma.$disconnect()
    }
  },
};
