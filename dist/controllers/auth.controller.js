"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var authCtrl = {};

authCtrl.iniciarSesion = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, userFound, matchPassword, token, online;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            userFound = _context.sent;

            if (userFound) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 6:
            if (userFound.status) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'Usuario Inactivo'
            }));

          case 8:
            if (!(userFound.online === 1)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Usuario ya se encuentra logueado'
            }));

          case 10:
            _context.next = 12;
            return _User["default"].matchPassword(password, userFound.password);

          case 12:
            matchPassword = _context.sent;

            if (matchPassword) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              token: null,
              message: 'Contraseña Errónea'
            }));

          case 15:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: '24h'
            }); //Cambio de estado a online

            _context.next = 18;
            return _User["default"].findByIdAndUpdate(userFound._id, {
              online: 1
            });

          case 18:
            online = _context.sent;
            console.log('Token:', token);
            res.json({
              token: token,
              codigoUser: userFound._id
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

authCtrl.cambiarContrasena = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, _req$body2, oldPassword, newPassword, userFound, matchPassword, newObj;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = res.locals.jwtPayload.id;
            _req$body2 = req.body, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword;

            if (oldPassword && newPassword) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              message: 'Contraseñas no coinciden'
            }));

          case 4:
            _context2.next = 6;
            return _User["default"].findById(id);

          case 6:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 9:
            _context2.next = 11;
            return _User["default"].matchPassword(oldPassword, userFound.password);

          case 11:
            matchPassword = _context2.sent;

            if (matchPassword) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              token: null,
              message: 'Contraseña Errónea'
            }));

          case 14:
            _context2.next = 16;
            return _User["default"].encryptPassword(newPassword);

          case 16:
            userFound.password = _context2.sent;
            _context2.next = 19;
            return userFound.save();

          case 19:
            newObj = _context2.sent;
            _context2.prev = 20;

            if (!newObj) {
              _context2.next = 23;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: 'Contraseña actualizada con éxito'
            }));

          case 23:
            _context2.next = 29;
            break;

          case 25:
            _context2.prev = 25;
            _context2.t0 = _context2["catch"](20);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(503).json({
              message: _context2.t0.message
            }));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[20, 25]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

authCtrl.cerrarSesion = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, userFound, offline;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = res.locals.jwtPayload.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _User["default"].findById(id);

          case 4:
            userFound = _context3.sent;

            if (!(userFound.online === 0)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              message: 'No existe sesión abierta'
            }));

          case 7:
            _context3.next = 9;
            return _User["default"].findByIdAndUpdate(id, {
              online: 0
            });

          case 9:
            offline = _context3.sent;

            if (!offline) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.json({
              message: 'Sesión cerrada con éxito'
            }));

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 14]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

authCtrl.forzarCierreSesion = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var username, userFound, idUser, offline;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = req.body.username;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            userFound = _context4.sent;
            // console.log(userFound)
            idUser = userFound._id;
            console.log(idUser);

            if (userFound) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Usuario no existe'
            }));

          case 9:
            if (!(userFound.online === 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              message: 'No existe sesión iniciada'
            }));

          case 11:
            _context4.next = 13;
            return _User["default"].findByIdAndUpdate(idUser, {
              online: 0
            });

          case 13:
            offline = _context4.sent;

            if (!offline) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'Se forzó el cierre de sesión'
            }));

          case 16:
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 18]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = authCtrl;
exports["default"] = _default;
//# sourceMappingURL=auth.controller.js.map