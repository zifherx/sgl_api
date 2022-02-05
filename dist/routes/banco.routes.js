"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _banco = _interopRequireDefault(require("../controllers/banco.controller"));

var _middlewares = require("../middlewares");

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var router = (0, _express.Router)();
router.get('/', _banco["default"].getAll);
router.get('/activos', _banco["default"].getAllByStatus);
router.get('/:bancoId', _banco["default"].getOneById);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateBanco], _multer["default"].single('avatar'), _banco["default"].createOne);
router.patch('/:bancoId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _multer["default"].single('avatar'), _banco["default"].updateOneById);
router["delete"]('/:bancoId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _banco["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=banco.routes.js.map