const logger = require("../../custom/logger")
const generalInternetStatus = require("../../models/generalInternetStatus")

module.exports = {
  async handle(req, res) {
    try {
      const internetStatus = await generalInternetStatus.execute()

      logger.info("internet status found successfully")
      res.status(200).json(internetStatus)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/generalInternetStatus.js"
      }
      throw error
    }
  },
}
