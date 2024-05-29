const logger = require("../../custom/logger")
const mostCommonCity = require("../../models/mostCommonCity")

module.exports = {
  async handle(req, res) {
    try {
      const city = await mostCommonCity.execute()

      logger.info("successfully found city")
      res.status(200).json(city)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/mostCommonCity.js"
      }
      throw error
    }
  },
}
