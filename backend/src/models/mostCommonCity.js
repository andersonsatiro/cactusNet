const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let citiesSet = new Set()
      let clients = await prisma.clientes.findMany()

      if (!clients || clients.length === 0) {
        return undefined;
      }

      clients.forEach((client) => {
        citiesSet.add(client.cidadeCliente)
      })

      let cities = Array.from(citiesSet)

      let citiesObject = cities.map(city => {
        return {
          "city": city,
          "amount": 0,
        }
      })

      clients.map((client) => {
        citiesObject.map((city) => {
          if(client.cidadeCliente === city.city){
            city.amount = city.amount + 1
          }
        })
      })

      let mostCommonCity = citiesObject.reduce((max, city) => {
        return city.amount > max.amount ? plan : max;
      }, citiesObject[0]);

      mostCommonCity = JSON.stringify(mostCommonCity, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return mostCommonCity
    } catch (error) {
      error.path = "src/models/mostCommonCity.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
