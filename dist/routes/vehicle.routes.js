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

router.get('/', _vehicle["default"].getVehicles); //Obtener Total Vehiculos

router.get('/count', _vehicle["default"].getCountAll); //Obtener Vehiculo por ID

router.get('/:vehicleId', _vehicle["default"].getVehicleById); //Obtener Vehiculo por Marca

router.post('/by-marca', _vehicle["default"].getVehiculeByMarca); //Obtener Vehiculo por Modelo

router.post('/by-modelo', _vehicle["default"].getVehiculeByModelo); //Obtener Vehiculo por COD-TDP

router.post('/find', _vehicle["default"].getVehicleByCodigo); //Crear Vehiculo

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateVehiculo], _vehicle["default"].createVehicle); //Actualizar Vehiculo

router.patch('/:vehicleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _vehicle["default"].updateVehicleById); //Eliminar Vehiculo

router["delete"]('/:vehicleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _vehicle["default"].deleteVehicleById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=vehicle.routes.js.map