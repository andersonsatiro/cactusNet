const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute(city) {
    try {
      let internetStatus = [0,0,0,0,0,0,0]

      const response = await prisma.clientes.findMany({
        where: {
          cidadeCliente: city
        }
      });

      response.forEach((client) => {
        internetStatus[client.statusInternet] += 1
      })

      internetStatus = JSON.stringify(internetStatus, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );

      return internetStatus;
    } catch (error) {
      error.path = "src/models/cityInternetStatus.js";
      throw error;
      // ... tratamento de erros ...
    } finally {
      await prisma.$disconnect(); // desconecta o Prisma Client do banco de dados
    }
  },
};
