const logger = require("../../custom/logger")
const averageTimeConnected = require("../../models/averageTimeConnected")

module.exports = {
  async handle(req, res) {
    try {
      const time = await averageTimeConnected.execute()

      logger.info("successfully found time")
      res.status(200).json(time)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/averageTimeConnected.js"
      }
      throw error
    }
  },
}
