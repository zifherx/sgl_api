"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/signin', _auth["default"].iniciarSesion);
router.post('/change-password', [_middlewares.authJwt.verifyToken], _auth["default"].cambiarContrasena);
router.post('/force-logout', _auth["default"].forzarCierreSesion);
router.post('/logout', [_middlewares.authJwt.verifyToken], _auth["default"].cerrarSesion);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.routes.js.map