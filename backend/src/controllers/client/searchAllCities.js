const logger = require("../../custom/logger");
const searchAllCities = require("../../models/searchAllCities");

module.exports = {
  async handle(req, res) {
    try {
      const cities = await searchAllCities.execute();

      logger.info("successfully found clients");
      res.status(200).json(cities);
    } catch (error) {
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/searchAllCitiesController.js";
      }
      throw error;
    }
  },
};
