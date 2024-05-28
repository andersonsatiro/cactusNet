const logger = require("../../custom/logger")
const internetStatusByHub = require("../../models/internetStatusByHub")

module.exports = {
  async handle(req, res) {
    try {
      const internetStatus = await internetStatusByHub.execute(req.params.hub)

      logger.info("internet status found successfully")
      res.status(200).json(internetStatus)
    } catch (error) {
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/internetStatusByHub.js"
      }
      throw error
    }
  },
}
