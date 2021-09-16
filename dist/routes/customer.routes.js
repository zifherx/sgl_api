"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _customer = _interopRequireDefault(require("../controllers/customer.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _customer["default"].getAll);
router.get('/count', _customer["default"].getCountAll);
router.get('/:customerId', _customer["default"].getOne);
router.post('/', [_middlewares.authJwt.verifyToken], _customer["default"].createCustomer);
router.patch('/:customerId', [_middlewares.authJwt.verifyToken], _customer["default"].updateCustomer);
router["delete"]('/:customerId', [_middlewares.authJwt.verifyToken], _customer["default"].deleteCustomer);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=customer.routes.js.map