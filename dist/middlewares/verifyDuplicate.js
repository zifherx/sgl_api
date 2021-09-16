"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDuplicateConversion = exports.checkDuplicateSucursal = exports.checkDuplicateVehiculo = exports.checkDuplicateChasis = exports.checkDuplicateModelo = exports.checkDuplicateMarca = exports.checkUserDuplicate = exports.checkRoleDuplicate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _Chasis = _interopRequireDefault(require("../models/Chasis"));

var _Marca = _interopRequireDefault(require("../models/Marca"));

var _Modelo = _interopRequireDefault(require("../models/Modelo"));

var _Sucursal = _interopRequireDefault(require("../models/Sucursal"));

var _Vehicle = _interopRequireDefault(require("../models/Vehicle"));

var _Conversion = _interopRequireDefault(require("../models/Conversion"));

var checkRoleDuplicate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var name, roleFound;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req.body.name;
            _context.next = 3;
            return _Role["default"].findOne({
              name: name
            });

          case 3:
            roleFound = _context.sent;

            if (!roleFound) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(201).json({
              message: 'El rol ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkRoleDuplicate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkRoleDuplicate = checkRoleDuplicate;

var checkUserDuplicate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, username, email, userFound1, userFound2;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email;
            _context2.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            userFound1 = _context2.sent;
            _context2.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            userFound2 = _context2.sent;

            if (!userFound1) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(201).json({
              message: 'El nombre de usuario ya existe'
            }));

          case 9:
            if (!userFound2) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(201).json({
              message: 'El email de usuario ya está registrado'
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkUserDuplicate(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkUserDuplicate = checkUserDuplicate;

var checkDuplicateMarca = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = req.body.name;
            _context3.next = 3;
            return _Marca["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context3.sent;

            if (!encontrado) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(201).json({
              message: 'La Marca ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function checkDuplicateMarca(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.checkDuplicateMarca = checkDuplicateMarca;

var checkDuplicateModelo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var name, modeloEncontrado;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            name = req.body.name;
            _context4.next = 3;
            return _Modelo["default"].findOne({
              name: name
            });

          case 3:
            modeloEncontrado = _context4.sent;

            if (!modeloEncontrado) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(201).json({
              message: 'El Modelo ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function checkDuplicateModelo(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.checkDuplicateModelo = checkDuplicateModelo;

var checkDuplicateChasis = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            name = req.body.name;
            _context5.next = 3;
            return _Chasis["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context5.sent;

            if (!encontrado) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(201).json({
              message: 'El Chasis ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function checkDuplicateChasis(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.checkDuplicateChasis = checkDuplicateChasis;

var checkDuplicateVehiculo = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _req$body2, cod_tdp, version, encontrado, encontrado1;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, cod_tdp = _req$body2.cod_tdp, version = _req$body2.version;
            _context6.next = 3;
            return _Vehicle["default"].findOne({
              cod_tdp: cod_tdp
            });

          case 3:
            encontrado = _context6.sent;
            _context6.next = 6;
            return _Vehicle["default"].findOne({
              version: version
            });

          case 6:
            encontrado1 = _context6.sent;

            if (!encontrado) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(201).json({
              message: 'El COD-TDP ya existe'
            }));

          case 9:
            if (!encontrado1) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(201).json({
              message: 'El vehículo ya existe'
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function checkDuplicateVehiculo(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.checkDuplicateVehiculo = checkDuplicateVehiculo;

var checkDuplicateSucursal = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            name = req.body.name;
            _context7.next = 3;
            return _Sucursal["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context7.sent;

            if (!encontrado) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(201).json({
              message: 'La sucursal ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function checkDuplicateSucursal(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.checkDuplicateSucursal = checkDuplicateSucursal;

var checkDuplicateConversion = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            name = req.body.name;
            _context8.next = 3;
            return _Conversion["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context8.sent;

            if (!encontrado) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(201).json({
              message: 'La Conversion ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function checkDuplicateConversion(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.checkDuplicateConversion = checkDuplicateConversion;
//# sourceMappingURL=verifyDuplicate.js.map