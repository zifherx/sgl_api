"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _financiamiento = _interopRequireDefault(require("../controllers/financiamiento.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)(); // Obtener todos los financiamientos

router.get('/', _financiamiento["default"].getAll); // Obtener financiamientos activos

router.get('/activos', _financiamiento["default"].getActivos); // Obtener un financiamiento

router.get('/:financesId', _financiamiento["default"].getOneById); //Crear un nuevo financiamiento

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateFinances], _financiamiento["default"].createOne); //Actualizar financiamiento

router.patch('/:financesId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _financiamiento["default"].updateOneById); //Eliminar financiamiento

router["delete"]('/:financesId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _financiamiento["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=financiamiento.routes.js.map