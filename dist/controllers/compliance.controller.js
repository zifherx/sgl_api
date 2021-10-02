"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Compliance = _interopRequireDefault(require("../models/Compliance"));

var _Seller = _interopRequireDefault(require("../models/Seller"));

var _User = _interopRequireDefault(require("../models/User"));

var cumplimientoCtrl = {};

cumplimientoCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Compliance["default"].find();

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
              message: 'No existe tabla de Cumplimiento'
            }));

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(503).json({
              message: _context.t0.message
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

cumplimientoCtrl.getOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var complianceId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            complianceId = req.params.complianceId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Compliance["default"].findById(complianceId);

          case 4:
            query = _context2.sent;

            if (!query) {
              _context2.next = 9;
              break;
            }

            res.json({
              encontrado: query
            });
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existe el cumplimiento'
            }));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);
            return _context2.abrupt("return", res.status(503).json({
              message: _context2.t0.message
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

cumplimientoCtrl.createCumplimiento = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, asesor_venta, nro_asignados, nro_atendidos, nro_vendidos, meta_asignados, meta_atendidos, meta_vendidos, sucursal, anio, mes, userCreator, nuevoObjeto, asesorFound, creador, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, asesor_venta = _req$body.asesor_venta, nro_asignados = _req$body.nro_asignados, nro_atendidos = _req$body.nro_atendidos, nro_vendidos = _req$body.nro_vendidos, meta_asignados = _req$body.meta_asignados, meta_atendidos = _req$body.meta_atendidos, meta_vendidos = _req$body.meta_vendidos, sucursal = _req$body.sucursal, anio = _req$body.anio, mes = _req$body.mes, userCreator = _req$body.userCreator;
            _context3.prev = 1;
            nuevoObjeto = new _Compliance["default"]({
              nro_asignados: nro_asignados,
              nro_atendidos: nro_atendidos,
              nro_vendidos: nro_vendidos,
              meta_asignados: meta_asignados,
              meta_atendidos: meta_atendidos,
              meta_vendidos: meta_vendidos,
              sucursal: sucursal,
              anio: anio,
              mes: mes
            });
            _context3.next = 5;
            return _Seller["default"].find({
              name: asesor_venta
            });

          case 5:
            asesorFound = _context3.sent;
            nuevoObjeto.asesor_venta = asesorFound.map(function (a) {
              return a._id;
            });
            _context3.next = 9;
            return _User["default"].find({
              username: userCreator
            });

          case 9:
            creador = _context3.sent;
            nuevoObjeto.userCreator = creador.map(function (b) {
              return b._id;
            });
            _context3.next = 13;
            return nuevoObjeto.save();

          case 13:
            query = _context3.sent;

            if (query) {
              res.json({
                message: 'Cumplimiento creado con éxito'
              });
            }

            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 17]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

cumplimientoCtrl.eliminarCumpimiento = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var complianceId, query;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            complianceId = req.params.complianceId;
            _context4.prev = 1;
            _context4.next = 4;
            return _Compliance["default"].findByIdAndRemove(complianceId);

          case 4:
            query = _context4.sent;

            if (!query) {
              _context4.next = 9;
              break;
            }

            res.json({
              message: 'Cumplimiento eliminado con éxito'
            });
            _context4.next = 10;
            break;

          case 9:
            return _context4.abrupt("return", res.status(404).json({
              message: 'Cumplimiento no encontrado'
            }));

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

cumplimientoCtrl.getCountAll = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _Compliance["default"].countDocuments();

          case 3:
            query = _context5.sent;

            if (!(query > 0)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json({
              nro_registros: query
            }));

          case 6:
            if (!(query == 0)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.json({
              message: 'No existen registros'
            }));

          case 8:
            _context5.next = 14;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

cumplimientoCtrl.getByAsesor = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var asesor, asesorEncontrado, query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            asesor = req.body.asesor;
            _context6.prev = 1;
            _context6.next = 4;
            return _Seller["default"].findOne({
              name: asesor
            });

          case 4:
            asesorEncontrado = _context6.sent;

            if (asesorEncontrado) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: 'Asesor no encontrado'
            }));

          case 7:
            _context6.next = 9;
            return _Compliance["default"].where({
              asesor_venta: asesorEncontrado._id
            }).find();

          case 9:
            query = _context6.sent;

            if (!(query.length > 0)) {
              _context6.next = 14;
              break;
            }

            res.json({
              nro_registros: query.length,
              registros: query
            });
            _context6.next = 15;
            break;

          case 14:
            return _context6.abrupt("return", res.status(404).json({
              message: 'No cuenta con metas registradas '
            }));

          case 15:
            _context6.next = 21;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](1);
            console.error(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 17]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

cumplimientoCtrl.getCumplimientosxFecha = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body2, sucursal, start, end, query;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body2 = req.body, sucursal = _req$body2.sucursal, start = _req$body2.start, end = _req$body2.end;
            _context7.prev = 1;
            _context7.next = 4;
            return _Compliance["default"].where({
              sucursal: sucursal,
              fecha: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).find();

          case 4:
            query = _context7.sent;

            if (!(query.length > 0)) {
              _context7.next = 9;
              break;
            }

            res.json({
              nro_registros: query.length,
              registros: query
            });
            _context7.next = 10;
            break;

          case 9:
            return _context7.abrupt("return", res.status(404).json({
              message: "No hay registros en ".concat(sucursal, " en esas fechas")
            }));

          case 10:
            _context7.next = 16;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](1);
            console.error(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              message: _context7.t0.message
            }));

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 12]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = cumplimientoCtrl;
exports["default"] = _default;
//# sourceMappingURL=compliance.controller.js.map