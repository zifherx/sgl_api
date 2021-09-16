"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMarca = exports.updateMarca = exports.createMarca = exports.getMarcaByActivo = exports.getMarcaById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Marca = _interopRequireDefault(require("../models/Marca"));

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Marca["default"].find().sort({
              name: 'asc'
            });

          case 3:
            query = _context.sent;

            if (!(query.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json(query);
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: 'No existen Marcas'
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

var getMarcaById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var marcaId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            marcaId = req.params.marcaId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Marca["default"].findById(marcaId);

          case 4:
            query = _context2.sent;

            if (!query) {
              _context2.next = 9;
              break;
            }

            res.json(query);
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existe Marca'
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

  return function getMarcaById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getMarcaById = getMarcaById;

var getMarcaByActivo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Marca["default"].find({
              status: true
            }).sort({
              name: 'asc'
            });

          case 3:
            query = _context3.sent;

            if (query.length > 0) {
              res.json(query);
            } else {
              res.status(404).json({
                message: 'No existen Marcas Activas'
              });
            }

            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(503).json({
              message: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getMarcaByActivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMarcaByActivo = getMarcaByActivo;

var createMarca = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, name, status, newMarca, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, status = _req$body.status;
            _context4.prev = 1;
            newMarca = new _Marca["default"]({
              name: name,
              status: status
            });
            _context4.next = 5;
            return newMarca.save();

          case 5:
            query = _context4.sent;

            if (query) {
              res.json({
                message: 'Marca creada con éxito'
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

  return function createMarca(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createMarca = createMarca;

var updateMarca = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, name, status, marcaId, _updateMarca;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, status = _req$body2.status;
            marcaId = req.params.marcaId;
            _context5.prev = 2;
            _context5.next = 5;
            return _Marca["default"].findByIdAndUpdate(marcaId, {
              name: name,
              status: status
            });

          case 5:
            _updateMarca = _context5.sent;

            if (_updateMarca) {
              res.json({
                message: 'Marca actualizada con éxito'
              });
            } else {
              res.status(404).json({
                message: 'No existe Marca a eliminar'
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

  return function updateMarca(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateMarca = updateMarca;

var deleteMarca = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var marcaId, _deleteMarca;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            marcaId = req.params.marcaId;
            _context6.prev = 1;
            _context6.next = 4;
            return _Marca["default"].findByIdAndDelete(marcaId);

          case 4:
            _deleteMarca = _context6.sent;

            if (!_deleteMarca) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: 'Marca eliminada con éxito'
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: 'No existe Marca a eliminar'
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

  return function deleteMarca(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteMarca = deleteMarca;
//# sourceMappingURL=marca.controller.js.map