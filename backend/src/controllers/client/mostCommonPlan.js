const logger = require("../../custom/logger")
const mostCommonPlan = require("../../models/mostCommonPlan")

module.exports = {
  async handle(req, res) {
    try {
      const plan = await mostCommonPlan.execute()

      logger.info("successfully found plan")
      res.status(200).json(plan)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/mostCommonPlan.js"
      }
      throw error
    }
  },
}
