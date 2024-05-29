const { Router } = require("express")

const findByIdClientesController = require("./controllers/client/findManyClientes")
const searchAllCitiesController = require("./controllers/client/searchAllCities")
const cityInternetStatusController = require("./controllers/client/cityInternetStatus")
const generalInternetStatusController = require("./controllers/client/generalInternetStatus")
const searchAllHubsController = require("./controllers/client/searchAllHubs")
const internetStatusByHubController = require("./controllers/client/internetStatusByHub")
const internetStatusByPopClienteController = require("./controllers/client/internetStatusByPopCliente")
const searchAllPopClientesController = require("./controllers/client/searchAllPopClientes")
const mostCommonPlanController = require("./controllers/client/mostCommonPlan")
const mostCommonCityController = require("./controllers/client/mostCommonCity")
const averageTimeConnectedController = require("./controllers/client/averageTimeConnected")

const routes = Router()

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle)
routes.get("/searchAllCities", searchAllCitiesController.handle)
routes.get("/cityInternetStatus/:city", cityInternetStatusController.handle)
routes.get("/generalInternetStatus/", generalInternetStatusController.handle)
routes.get("/searchAllHubs", searchAllHubsController.handle)
routes.get("/internetStatusByHub/:hub", internetStatusByHubController.handle)
routes.get("/internetStatusByPopCliente/:popCliente", internetStatusByPopClienteController.handle)
routes.get("/searchAllPopClientes", searchAllPopClientesController.handle)
routes.get("/mostCommonPlan", mostCommonPlanController.handle)
routes.get("/mostCommonCity", mostCommonCityController.handle)
routes.get("/averageTimeConnected", averageTimeConnectedController.handle)


module.exports = routes