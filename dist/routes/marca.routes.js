"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _marca = _interopRequireDefault(require("../controllers/marca.controller"));

var _middlewares = require("../middlewares");

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var router = (0, _express.Router)(); //Obtener Marca

router.get('/', _marca["default"].getAll); //Obtener Marca Activos

router.get('/activos', _marca["default"].getMarcaByActivo); //Obtener Marca por ID

router.get('/:marcaId', _marca["default"].getMarcaById); //Crear Marca

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateMarca], _multer["default"].single('avatar'), _marca["default"].createMarca); //Actualizar Marca

router.patch('/:marcaId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _multer["default"].single('avatar'), _marca["default"].updateMarca); //Eliminar Marca

router["delete"]('/:marcaId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _marca["default"].deleteMarca);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=marca.routes.js.map