"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _originData = _interopRequireDefault(require("../controllers/originData.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _originData["default"].getAll);
router.get('/activos', _originData["default"].getActivos);
router.get('/:originId', _originData["default"].getOneById);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkOriginDuplicate], _originData["default"].createOne);
router.patch('/:originId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _originData["default"].updateOneById);
router["delete"]('/:originId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _originData["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=originData.routes.js.map