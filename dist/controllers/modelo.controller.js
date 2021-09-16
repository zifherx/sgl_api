"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteModelo = exports.updateModelo = exports.createModelo = exports.getModeloByActivo = exports.getModeloById = exports.getModelos = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Modelo = _interopRequireDefault(require("../models/Modelo"));

var getModelos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var modelos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Modelo["default"].find().sort({
              name: 'asc'
            });

          case 3:
            modelos = _context.sent;

            if (modelos.length > 0) {
              res.json(modelos);
            } else {
              res.status(404).json({
                message: 'No existen Modelos'
              });
            }

            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(503).json({
              message: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getModelos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getModelos = getModelos;

var getModeloById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var modeloId, modelos;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            modeloId = req.params.modeloId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Modelo["default"].findById(modeloId);

          case 4:
            modelos = _context2.sent;

            if (!modelos) {
              _context2.next = 9;
              break;
            }

            res.json(modelos);
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existe el Modelo'
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

  return function getModeloById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getModeloById = getModeloById;

var getModeloByActivo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var modelos;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Modelo["default"].find({
              status: true
            }).sort({
              name: 'asc'
            });

          case 3:
            modelos = _context3.sent;

            if (!(modelos.length > 0)) {
              _context3.next = 8;
              break;
            }

            res.json(modelos);
            _context3.next = 9;
            break;

          case 8:
            return _context3.abrupt("return", res.status(404).json({
              message: 'No existen Modelos Activos'
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

  return function getModeloByActivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getModeloByActivo = getModeloByActivo;

var createModelo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, name, status, newModelo, modeloCreado;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, status = _req$body.status;
            _context4.prev = 1;
            newModelo = new _Modelo["default"]({
              name: name,
              status: status
            });
            _context4.next = 5;
            return newModelo.save();

          case 5:
            modeloCreado = _context4.sent;

            if (modeloCreado) {
              res.json({
                message: 'Modelo creado con éxito'
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

  return function createModelo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createModelo = createModelo;

var updateModelo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, name, status, modeloId, _updateModelo;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, status = _req$body2.status;
            modeloId = req.params.modeloId;
            _context5.prev = 2;
            _context5.next = 5;
            return _Modelo["default"].findByIdAndUpdate(modeloId, {
              name: name,
              status: status
            });

          case 5:
            _updateModelo = _context5.sent;

            if (_updateModelo) {
              res.json({
                message: 'Modelo actualizado con éxito'
              });
            } else {
              res.status(404).json({
                message: 'No existe Modelo a actualizar'
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

  return function updateModelo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateModelo = updateModelo;

var deleteModelo = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var modeloId, _deleteModelo;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            modeloId = req.params.modeloId;
            _context6.prev = 1;
            _context6.next = 4;
            return _Modelo["default"].findByIdAndDelete(modeloId);

          case 4:
            _deleteModelo = _context6.sent;

            if (!_deleteModelo) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: 'Modelo eliminado con éxito'
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: 'No existe Modelo a eliminar'
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

  return function deleteModelo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteModelo = deleteModelo;
//# sourceMappingURL=modelo.controller.js.map