"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _role = _interopRequireDefault(require("../controllers/role.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _role["default"].getAll);
router.get('/count', _role["default"].getCount);
router.get('/:roleId', _role["default"].getOne);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkRoleDuplicate], _role["default"].createRole);
router.patch('/:roleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _role["default"].updateRole);
router["delete"]('/:roleId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _role["default"].deleteRole);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=roles.routes.js.map