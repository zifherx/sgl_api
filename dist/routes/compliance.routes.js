"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _compliance = _interopRequireDefault(require("../controllers/compliance.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)(); //Obtener Todos los cumplimientos

router.get('/', _compliance["default"].getAll); //Contador de Registros

router.get('/count/all', _compliance["default"].getCountAll); //Obtener Cumplimiento por ID

router.get('/:complianceId', _compliance["default"].getOne); //Eliminar Cumplimiento por ID

router["delete"]('/:complianceId', _compliance["default"].eliminarCumpimiento); //Creando cumplimiento

router.post('/', _compliance["default"].createCumplimiento); //Obtener Cumplimientos del Asesor

router.post('/goals/by-asesor', _compliance["default"].getByAsesor); //Obtener registros por Sede y Fecha

router.post('/goals/by-sucursal', _compliance["default"].getCumplimientosxFecha);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=compliance.routes.js.map