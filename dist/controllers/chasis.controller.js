"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteChasis = exports.updateChasis = exports.createChasis = exports.getChasisByActivo = exports.getChasisById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Chasis = _interopRequireDefault(require("../models/Chasis"));

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var objeto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Chasis["default"].find().sort({
              name: 'asc'
            });

          case 3:
            objeto = _context.sent;

            if (!(objeto.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json(objeto);
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: 'No existen Chasis'
            }));

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(503).json({
              message: _context.t0.message
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function getAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var getChasisById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var chasisId, objeto;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chasisId = req.params.chasisId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Chasis["default"].findById(chasisId);

          case 4:
            objeto = _context2.sent;

            if (!objeto) {
              _context2.next = 9;
              break;
            }

            res.json(objeto);
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existe Chasis'
            }));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(503).json({
              message: _context2.t0.message
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function getChasisById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getChasisById = getChasisById;

var getChasisByActivo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var objeto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Chasis["default"].find({
              status: true
            }).sort({
              name: 'asc'
            });

          case 3:
            objeto = _context3.sent;

            if (!(objeto.length > 0)) {
              _context3.next = 8;
              break;
            }

            res.json(objeto);
            _context3.next = 9;
            break;

          case 8:
            return _context3.abrupt("return", res.status(404).json({
              message: 'No existen Chasis Activos'
            }));

          case 9:
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(503).json({
              message: _context3.t0.message
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function getChasisByActivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getChasisByActivo = getChasisByActivo;

var createChasis = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, name, status, nuevo, objeto;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, status = _req$body.status;
            _context4.prev = 1;
            nuevo = new _Chasis["default"]({
              name: name,
              status: status
            });
            _context4.next = 5;
            return nuevo.save();

          case 5:
            objeto = _context4.sent;

            if (objeto) {
              res.json({
                message: 'Chasis creado con éxito'
              });
            }

            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(503).json({
              message: _context4.t0.message
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function createChasis(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createChasis = createChasis;

var updateChasis = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, name, status, chasisId, objeto;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, status = _req$body2.status;
            chasisId = req.params.chasisId;
            _context5.prev = 2;
            _context5.next = 5;
            return _Chasis["default"].findByIdAndUpdate(chasisId, {
              name: name,
              status: status
            });

          case 5:
            objeto = _context5.sent;

            if (objeto) {
              res.json({
                message: 'Chasis actualizado con éxito'
              });
            } else {
              res.status(404).json({
                message: 'No existe Chasis a actualizar'
              });
            }

            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            res.status(503).json({
              message: _context5.t0.message
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 9]]);
  }));

  return function updateChasis(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateChasis = updateChasis;

var deleteChasis = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var chasisId, objeto;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            chasisId = req.params.chasisId;
            _context6.prev = 1;
            _context6.next = 4;
            return _Chasis["default"].findByIdAndDelete(chasisId);

          case 4:
            objeto = _context6.sent;

            if (!objeto) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: 'Chasis eliminado con éxito'
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: 'No existe Chasis a eliminar'
            }));

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            res.status(503).json({
              message: _context6.t0.message
            });

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 12]]);
  }));

  return function deleteChasis(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteChasis = deleteChasis;
//# sourceMappingURL=chasis.controller.js.map