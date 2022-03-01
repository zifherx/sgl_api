"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserDuplicate = exports.checkSellerDuplicate = exports.checkRoleDuplicate = exports.checkOriginDuplicate = exports.checkDuplicateVehiculo = exports.checkDuplicateSucursal = exports.checkDuplicateMotivoRechazo = exports.checkDuplicateModelo = exports.checkDuplicateMarca = exports.checkDuplicateFinances = exports.checkDuplicateConversion = exports.checkDuplicateCity = exports.checkDuplicateChasis = exports.checkDuplicateBanco = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _Seller = _interopRequireDefault(require("../models/Seller"));

var _Chasis = _interopRequireDefault(require("../models/Chasis"));

var _Marca = _interopRequireDefault(require("../models/Marca"));

var _Modelo = _interopRequireDefault(require("../models/Modelo"));

var _Sucursal = _interopRequireDefault(require("../models/Sucursal"));

var _Vehicle = _interopRequireDefault(require("../models/Vehicle"));

var _City = _interopRequireDefault(require("../models/City"));

var _Financiamiento = _interopRequireDefault(require("../models/Financiamiento"));

var _EstadoConversion = _interopRequireDefault(require("../models/EstadoConversion"));

var _OriginData = _interopRequireDefault(require("../models/OriginData"));

var _MotivoRechazo = _interopRequireDefault(require("../models/MotivoRechazo"));

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

            return _context.abrupt("return", res.status(500).json({
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
    var username, userFound;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            username = req.body.username;
            _context2.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            userFound = _context2.sent;

            if (!userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(500).json({
              message: 'El nombre de usuario ya existe'
            }));

          case 6:
            next();

          case 7:
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

            return _context3.abrupt("return", res.status(500).json({
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

            return _context4.abrupt("return", res.status(500).json({
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

var checkDuplicateBanco = /*#__PURE__*/function () {
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

            return _context5.abrupt("return", res.status(500).json({
              message: 'Entidad Bancaria ya existe'
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

  return function checkDuplicateBanco(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.checkDuplicateBanco = checkDuplicateBanco;

var checkDuplicateChasis = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            name = req.body.name;
            _context6.next = 3;
            return _Chasis["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context6.sent;

            if (!encontrado) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(500).json({
              message: 'El Chasis ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function checkDuplicateChasis(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.checkDuplicateChasis = checkDuplicateChasis;

var checkDuplicateVehiculo = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var _req$body, cod_tdp, version, encontrado, encontrado1;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, cod_tdp = _req$body.cod_tdp, version = _req$body.version;
            _context7.next = 3;
            return _Vehicle["default"].findOne({
              cod_tdp: cod_tdp
            });

          case 3:
            encontrado = _context7.sent;
            _context7.next = 6;
            return _Vehicle["default"].findOne({
              version: version
            });

          case 6:
            encontrado1 = _context7.sent;

            if (!encontrado) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(500).json({
              message: 'El COD-TDP ya existe'
            }));

          case 9:
            if (!encontrado1) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(500).json({
              message: 'El vehículo ya existe'
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function checkDuplicateVehiculo(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.checkDuplicateVehiculo = checkDuplicateVehiculo;

var checkDuplicateSucursal = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            name = req.body.name;
            _context8.next = 3;
            return _Sucursal["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context8.sent;

            if (!encontrado) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.status(500).json({
              message: 'La sucursal ya existe'
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

  return function checkDuplicateSucursal(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.checkDuplicateSucursal = checkDuplicateSucursal;

var checkSellerDuplicate = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var _req$body2, name, document, nameFounded, documentFounded;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, document = _req$body2.document;
            _context9.next = 3;
            return _Seller["default"].findOne({
              name: name
            });

          case 3:
            nameFounded = _context9.sent;
            _context9.next = 6;
            return _Seller["default"].findOne({
              document: document
            });

          case 6:
            documentFounded = _context9.sent;

            if (!nameFounded) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt("return", res.status(500).json({
              message: 'El Vendedor ya existe'
            }));

          case 9:
            if (!documentFounded) {
              _context9.next = 11;
              break;
            }

            return _context9.abrupt("return", res.status(500).json({
              message: 'El documento del Vendedor ya existe'
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function checkSellerDuplicate(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

exports.checkSellerDuplicate = checkSellerDuplicate;

var checkDuplicateCity = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            name = req.body.name;
            _context10.next = 3;
            return _City["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context10.sent;

            if (!encontrado) {
              _context10.next = 6;
              break;
            }

            return _context10.abrupt("return", res.status(500).json({
              message: 'La ciudad ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function checkDuplicateCity(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

exports.checkDuplicateCity = checkDuplicateCity;

var checkDuplicateFinances = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            name = req.body.name;
            _context11.next = 3;
            return _Financiamiento["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context11.sent;

            if (!encontrado) {
              _context11.next = 6;
              break;
            }

            return _context11.abrupt("return", res.status(500).json({
              message: 'El tipo de financiamiento ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function checkDuplicateFinances(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();

exports.checkDuplicateFinances = checkDuplicateFinances;

var checkDuplicateConversion = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            name = req.body.name;
            _context12.next = 3;
            return _EstadoConversion["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context12.sent;

            if (!encontrado) {
              _context12.next = 6;
              break;
            }

            return _context12.abrupt("return", res.status(500).json({
              message: 'El estado ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function checkDuplicateConversion(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();

exports.checkDuplicateConversion = checkDuplicateConversion;

var checkOriginDuplicate = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            name = req.body.name;
            _context13.next = 3;
            return _OriginData["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context13.sent;

            if (!encontrado) {
              _context13.next = 6;
              break;
            }

            return _context13.abrupt("return", res.status(500).json({
              message: 'El origen ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function checkOriginDuplicate(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();

exports.checkOriginDuplicate = checkOriginDuplicate;

var checkDuplicateMotivoRechazo = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var name, encontrado;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            name = req.body.name;
            _context14.next = 3;
            return _MotivoRechazo["default"].findOne({
              name: name
            });

          case 3:
            encontrado = _context14.sent;

            if (!encontrado) {
              _context14.next = 6;
              break;
            }

            return _context14.abrupt("return", res.status(500).json({
              message: 'El motivo de rechazo ya existe'
            }));

          case 6:
            next();

          case 7:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function checkDuplicateMotivoRechazo(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();

exports.checkDuplicateMotivoRechazo = checkDuplicateMotivoRechazo;
//# sourceMappingURL=verifyDuplicate.js.map