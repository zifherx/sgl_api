"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _city = _interopRequireDefault(require("../controllers/city.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)(); //Obtener Ciudad

router.get('/', _city["default"].getAll); //Obtener Ciudad Activos

router.get('/activos', _city["default"].getCityByActivo); //Obtener Ciudad por ID

router.get('/:cityId', _city["default"].getCityById); //Crear Ciudad

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateCity], _city["default"].createCity); //Actualizar Ciudad

router.patch('/:cityId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _city["default"].updateCity); //Eliminar Ciudad

router["delete"]('/:cityId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _city["default"].deleteCity);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=city.routes.js.map