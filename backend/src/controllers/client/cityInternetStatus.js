const logger = require("../../custom/logger");
const cityInternetStatus = require("../../models/cityInternetStatus");

module.exports = {
  async handle(req, res) {
    try {
      const internetStatus = await cityInternetStatus.execute(req.params.city);

      logger.info("internet status found successfully");
      res.status(200).json(internetStatus);
    } catch (error) {
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/cityInternetStatus.js";
      }
      throw error;
    }
  },
};
