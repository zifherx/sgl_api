"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _conversion = _interopRequireDefault(require("../controllers/conversion.controller"));

var _middlewares = require("../middlewares");

var router = new _express.Router();
router.get('/', _conversion["default"].getAll);
router.get('/activos', _conversion["default"].getActivos);
router.get('/:conversionId', _conversion["default"].getOneById);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateConversion], _conversion["default"].createOne);
router.patch('/:conversionId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _conversion["default"].updateOneById);
router["delete"]('/:conversionId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _conversion["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=conversion.routes.js.map