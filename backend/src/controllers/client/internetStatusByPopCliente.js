const logger = require("../../custom/logger")
const internetStatusByPopCliente = require("../../models/internetStatusByPopCliente")

module.exports = {
  async handle(req, res) {
    try {
      const internetStatus = await internetStatusByPopCliente.execute(req.params.popCliente)

      logger.info("internet status found successfully")
      res.status(200).json(internetStatus)
    } catch (error) {
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/internetStatusByPopCliente.js"
      }
      throw error
    }
  },
}
