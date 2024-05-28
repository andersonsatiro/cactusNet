const { Router } = require("express")

const findByIdClientesController = require("./controllers/client/findManyClientes")
const searchAllCitiesController = require("./controllers/client/searchAllCities")
const cityInternetStatusController = require("./controllers/client/cityInternetStatus")
const generalInternetStatusController = require("./controllers/client/generalInternetStatus")
const searchAllHubsController = require("./controllers/client/searchAllHubs")
const internetStatusByHubController = require("./controllers/client/internetStatusByHub")

const routes = Router()

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle)
routes.get("/searchAllCities", searchAllCitiesController.handle)
routes.get("/cityInternetStatus/:city", cityInternetStatusController.handle)
routes.get("/generalInternetStatus/", generalInternetStatusController.handle)
routes.get("/searchAllHubs", searchAllHubsController.handle)
routes.get("/internetStatusByHub/:hub", internetStatusByHubController.handle)

module.exports = routes
