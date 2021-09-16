"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _vehicle = _interopRequireDefault(require("../controllers/vehicle.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)(); //Obtener Vehiculos

router.get('/', _vehicle["default"].getVehicles); //Obtener Vehiculo por ID

router.get('/:vehicleId', _vehicle["default"].getVehicleById); //Obtener Vehiculo por Marca

router.post('/marca', [_middlewares.authJwt.verifyToken], _vehicle["default"].getVehiculeByMarca); //Obtener Vehiculo por Modelo

router.post('/modelo', [_middlewares.authJwt.verifyToken], _vehicle["default"].getVehiculeByModelo); //Crear Vehiculo

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateVehiculo], _vehicle["default"].createVehicle); //Obtener Vehiculo por COD-TDP

router.post('/find', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _vehicle["default"].getVehicleByCodigo); //Actualizar Vehiculo

router.patch('/:vehicleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _vehicle["default"].updateVehicleById); //Eliminar Vehiculo

router["delete"]('/:vehicleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _vehicle["default"].deleteVehicleById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=vehicle.routes.js.map