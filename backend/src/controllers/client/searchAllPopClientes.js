const logger = require("../../custom/logger")
const searchAllPopClientes = require("../../models/searchAllPopClientes")

module.exports = {
  async handle(req, res) {
    try {
      const popClientes = await searchAllPopClientes.execute()

      logger.info("successfully found pop clientes")
      res.status(200).json(popClientes)
    } catch (error) {
      if (!error.path) {
        error.path = "src/controllers/client/searchAllPopClientes.js"
      }
      throw error
    }
  },
}
