const logger = require("../../custom/logger")
const searchAllHubs = require("../../models/searchAllHubs")

module.exports = {
  async handle(req, res) {
    try {
      const hubs = await searchAllHubs.execute()

      logger.info("successfully found hubs")
      res.status(200).json(hubs)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/searchAllHubs.js"
      }
      throw error
    }
  },
}
