const logger = require("../../custom/logger")
const totalRevenuePerMonth = require("../../models/totalRevenuePerMonth.js")

module.exports = {
  async handle(req, res) {
    try {
      const totalRevenue = await totalRevenuePerMonth.execute()

      logger.info("successfully found total revenue")
      res.status(200).json(totalRevenue)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/totalRevenuePerMonth.js"
      }
      throw error
    }
  },
}
