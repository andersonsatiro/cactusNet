const { Router } = require("express");

const findByIdClientesController = require("./controllers/client/findManyClientes");
const searchAllCitiesController = require("./controllers/client/searchAllCities")
const cityInternetStatusController = require("./controllers/client/cityInternetStatus")

const routes = Router();

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);
routes.get("/searchAllCities", searchAllCitiesController.handle);
routes.get("/cityInternetStatus/:city", cityInternetStatusController.handle);

module.exports = routes;
