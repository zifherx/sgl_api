"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _seller = _interopRequireDefault(require("../controllers/seller.controller"));

var _middlewares = require("../middlewares");

var _multer = _interopRequireDefault(require("../middlewares/multer"));

var router = (0, _express.Router)();
router.get('/', _seller["default"].getAll);
router.get('/activos', _seller["default"].getSellersByActive);
router.get('/count', _seller["default"].getCountAll);
router.get('/:sellerId', _seller["default"].getOne);
router.post('/by-sucursal', _seller["default"].getSellersBySucursal);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkSellerDuplicate], _multer["default"].single('avatar'), _seller["default"].createSeller);
router.patch('/:sellerId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _seller["default"].updateSeller);
router.patch('/upload/:sellerId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _multer["default"].single('avatar'), _seller["default"].updatePhoto);
router["delete"]('/:sellerId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _seller["default"].deleteSeller);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=seller.routes.js.map