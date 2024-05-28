const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = {
  async execute() {
    try {
      let plansSet = new Set()
      let clients = await prisma.clientes.findMany()

      if (!clients || clients.length === 0) {
        return undefined;
      }

      clients.forEach((client) => {
        plansSet.add(client.planoContrato)
      })

      let plans = Array.from(plansSet)

      let plansObject = plans.map(plan => {
        return {
          "plano": plan,
          "amount": 0,
        }
      })

      clients.map((client) => {
        plansObject.map((plan) => {
          if(client.planoContrato === plan.plano){
            plan.amount = plan.amount + 1
          }
        })
      })

      let mostCommonPlan = plansObject.reduce((max, plan) => {
        return plan.amount > max.amount ? plan : max;
      }, plansObject[0]);

      mostCommonPlan = JSON.stringify(mostCommonPlan, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )

      return mostCommonPlan
    } catch (error) {
      error.path = "src/models/mostCommonPlan.js"
      throw error
    } finally {
      await prisma.$disconnect()
    }
  },
}
