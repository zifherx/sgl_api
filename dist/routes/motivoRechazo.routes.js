"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _motivoRechazo = _interopRequireDefault(require("../controllers/motivoRechazo.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _motivoRechazo["default"].getAll);
router.get('/activos', _motivoRechazo["default"].getAllActivos);
router.get('/:bancoId', _motivoRechazo["default"].getOneById);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateMotivoRechazo], _motivoRechazo["default"].createOne);
router.patch('/:bancoId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _motivoRechazo["default"].updateOneById);
router["delete"]('/:bancoId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _motivoRechazo["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=motivoRechazo.routes.js.map