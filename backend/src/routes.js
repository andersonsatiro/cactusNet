const { Router } = require("express");

const findByIdClientesController = require("./controllers/client/findManyClientes");
const searchAllCitiesController = require("./controllers/client/searchAllCities")

const routes = Router();

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);
routes.get("/searchAllCities", searchAllCitiesController.handle);

module.exports = routes;
