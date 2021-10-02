"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Lead = _interopRequireDefault(require("../models/Lead"));

var _User = _interopRequireDefault(require("../models/User"));

var _Seller = _interopRequireDefault(require("../models/Seller"));

var leadCtrl = {};

leadCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Lead["default"].find().populate('asesorVenta userCreator').sort({
              name: 'asc'
            });

          case 3:
            query = _context.sent;

            if (!(query.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json({
              nro_leads: query.length,
              leads: query
            });
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: 'No existen Leads'
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

leadCtrl.getLeadsIngresados = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Lead["default"].where({
              status_asignado: false,
              statusLead: false
            }).populate('asesorVenta userCreator');

          case 3:
            query = _context2.sent;

            if (!(query.length > 0)) {
              _context2.next = 8;
              break;
            }

            res.json({
              nro_leads: query.length,
              leads: query
            });
            _context2.next = 9;
            break;

          case 8:
            return _context2.abrupt("return", res.status(404).json({
              message: 'No existen nuevos Leads'
            }));

          case 9:
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            return _context2.abrupt("return", res.status(503).json({
              message: _context2.t0.message
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

leadCtrl.getLeadsAsignados = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Lead["default"].where({
              status_asignado: true,
              statusLead: false
            }).find().populate('asesorVenta');

          case 3:
            query = _context3.sent;

            if (!(query.length > 0)) {
              _context3.next = 8;
              break;
            }

            res.json({
              nro_leads: query.length,
              leads: query
            });
            _context3.next = 9;
            break;

          case 8:
            return _context3.abrupt("return", res.status(404).json({
              message: 'No existen Leads asignados'
            }));

          case 9:
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

leadCtrl.getLeadsAtendidos = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Lead["default"].where({
              status_asignado: true,
              statusLead: true
            }).find().populate('asesorVenta userCreator');

          case 3:
            query = _context4.sent;

            if (!(query.length > 0)) {
              _context4.next = 8;
              break;
            }

            res.json({
              nro_leads: query.length,
              leads: query
            });
            _context4.next = 9;
            break;

          case 8:
            return _context4.abrupt("return", res.status(404).json({
              message: 'No existen Leads atendidos'
            }));

          case 9:
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

leadCtrl.getOne = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var leadId, query;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            leadId = req.params.leadId;
            _context5.prev = 1;
            _context5.next = 4;
            return _Lead["default"].findById(leadId).populate('asesorVenta userCreator');

          case 4:
            query = _context5.sent;

            if (!query) {
              _context5.next = 9;
              break;
            }

            res.json(query);
            _context5.next = 10;
            break;

          case 9:
            return _context5.abrupt("return", res.status(404).json({
              message: "No existe el Lead ".concat(leadId)
            }));

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            console.error(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

leadCtrl.createLead = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body, sucursal_lead, dataOrigin, customer_name, customer_document, customer_address, customer_city, customer_cellphone, customer_email, fecha_ingreso, fecha_asignacion, fecha_atencion, userCreator, newObj, userFound, query;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, sucursal_lead = _req$body.sucursal_lead, dataOrigin = _req$body.dataOrigin, customer_name = _req$body.customer_name, customer_document = _req$body.customer_document, customer_address = _req$body.customer_address, customer_city = _req$body.customer_city, customer_cellphone = _req$body.customer_cellphone, customer_email = _req$body.customer_email, fecha_ingreso = _req$body.fecha_ingreso, fecha_asignacion = _req$body.fecha_asignacion, fecha_atencion = _req$body.fecha_atencion, userCreator = _req$body.userCreator;
            _context6.prev = 1;
            newObj = new _Lead["default"]({
              sucursal_lead: sucursal_lead,
              dataOrigin: dataOrigin,
              customer_name: customer_name,
              customer_document: customer_document,
              customer_address: customer_address,
              customer_city: customer_city,
              customer_cellphone: customer_cellphone,
              customer_email: customer_email,
              fecha_ingreso: fecha_ingreso,
              fecha_asignacion: fecha_asignacion,
              fecha_atencion: fecha_atencion
            });
            _context6.next = 5;
            return _User["default"].find({
              username: userCreator
            });

          case 5:
            userFound = _context6.sent;
            newObj.userCreator = userFound.map(function (a) {
              return a._id;
            });
            _context6.next = 9;
            return newObj.save();

          case 9:
            query = _context6.sent;

            if (query) {
              res.json({
                message: 'Lead creado con éxito'
              });
            }

            _context6.next = 17;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](1);
            console.error(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 13]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

leadCtrl.asignarLead = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var leadId, _req$body2, status_asignado, fecha_asignacion, asesorVenta, jefeAsignador, jefeFound, sellerFound, query;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body2 = req.body, status_asignado = _req$body2.status_asignado, fecha_asignacion = _req$body2.fecha_asignacion, asesorVenta = _req$body2.asesorVenta, jefeAsignador = _req$body2.jefeAsignador;
            _context7.prev = 2;
            _context7.next = 5;
            return _User["default"].find({
              username: jefeAsignador
            });

          case 5:
            jefeFound = _context7.sent;
            _context7.next = 8;
            return _Seller["default"].find({
              name: {
                $in: asesorVenta
              }
            });

          case 8:
            sellerFound = _context7.sent;
            _context7.next = 11;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              status_asignado: status_asignado,
              fecha_asignacion: fecha_asignacion,
              asesorVenta: sellerFound.map(function (a) {
                return a._id;
              }),
              jefeAsignador: jefeFound.map(function (b) {
                return b._id;
              })
            });

          case 11:
            query = _context7.sent;

            if (!query) {
              _context7.next = 16;
              break;
            }

            res.json({
              message: 'Lead asignado con éxito'
            });
            _context7.next = 17;
            break;

          case 16:
            return _context7.abrupt("return", res.status(404).json({
              message: 'Lead no encontrado'
            }));

          case 17:
            _context7.next = 23;
            break;

          case 19:
            _context7.prev = 19;
            _context7.t0 = _context7["catch"](2);
            console.error(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              message: _context7.t0.message
            }));

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 19]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

leadCtrl.atenderLead = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var leadId, _req$body3, statusLead, modeloVehiculo, versionVehiculo, fecha_atencion, comentario, tipo_pago, valorUnidad, tipo_financiamiento, asesorAtencion, sellerFound, query;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body3 = req.body, statusLead = _req$body3.statusLead, modeloVehiculo = _req$body3.modeloVehiculo, versionVehiculo = _req$body3.versionVehiculo, fecha_atencion = _req$body3.fecha_atencion, comentario = _req$body3.comentario, tipo_pago = _req$body3.tipo_pago, valorUnidad = _req$body3.valorUnidad, tipo_financiamiento = _req$body3.tipo_financiamiento, asesorAtencion = _req$body3.asesorAtencion;
            _context8.prev = 2;
            _context8.next = 5;
            return _User["default"].find({
              username: asesorAtencion
            });

          case 5:
            sellerFound = _context8.sent;
            _context8.next = 8;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              statusLead: statusLead,
              modeloVehiculo: modeloVehiculo,
              versionVehiculo: versionVehiculo,
              fecha_atencion: fecha_atencion,
              comentario: comentario,
              tipo_pago: tipo_pago,
              valorUnidad: valorUnidad,
              tipo_financiamiento: tipo_financiamiento,
              asesorAtencion: sellerFound.map(function (a) {
                return a._id;
              })
            });

          case 8:
            query = _context8.sent;

            if (!query) {
              _context8.next = 13;
              break;
            }

            res.json({
              message: 'Lead actualizado con éxito'
            });
            _context8.next = 14;
            break;

          case 13:
            return _context8.abrupt("return", res.status(404).json({
              message: 'Lead no encontrado'
            }));

          case 14:
            _context8.next = 20;
            break;

          case 16:
            _context8.prev = 16;
            _context8.t0 = _context8["catch"](2);
            console.error(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              message: _context8.t0.message
            }));

          case 20:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 16]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

leadCtrl.actualizarVenta = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var leadId, _req$body4, lead_convertido, estatus_venta, query;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body4 = req.body, lead_convertido = _req$body4.lead_convertido, estatus_venta = _req$body4.estatus_venta;
            _context9.prev = 2;
            _context9.next = 5;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              lead_convertido: lead_convertido,
              estatus_venta: estatus_venta
            });

          case 5:
            query = _context9.sent;

            if (!query) {
              _context9.next = 10;
              break;
            }

            res.json({
              message: 'Estatus de Venta actualizado con éxito'
            });
            _context9.next = 11;
            break;

          case 10:
            return _context9.abrupt("return", res.status(404).json({
              message: 'Venta no encontrada'
            }));

          case 11:
            _context9.next = 17;
            break;

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](2);
            console.error(_context9.t0);
            return _context9.abrupt("return", res.status(503).json({
              message: _context9.t0.message
            }));

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 13]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

leadCtrl.deleteLead = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var leadId, query;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            leadId = req.params.leadId;
            _context10.prev = 1;
            _context10.next = 4;
            return _Lead["default"].findByIdAndRemove(leadId);

          case 4:
            query = _context10.sent;

            if (!query) {
              _context10.next = 9;
              break;
            }

            res.json({
              message: 'Lead eliminado con éxito'
            });
            _context10.next = 10;
            break;

          case 9:
            return _context10.abrupt("return", res.status(404).json({
              message: 'Lead no encontrado'
            }));

          case 10:
            _context10.next = 16;
            break;

          case 12:
            _context10.prev = 12;
            _context10.t0 = _context10["catch"](1);
            console.error(_context10.t0);
            return _context10.abrupt("return", res.status(503).json({
              message: _context10.t0.message
            }));

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 12]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

leadCtrl.getCountAll = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _Lead["default"].estimatedDocumentCount();

          case 3:
            query = _context11.sent;

            if (query >= 0) {
              res.json({
                nro_Leads: query
              });
            }

            _context11.next = 11;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            console.error(_context11.t0);
            return _context11.abrupt("return", res.status(503).json({
              message: _context11.t0.message
            }));

          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

leadCtrl.getCountByStatus = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var _req$body5, atendidos, asignados, query, query2;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$body5 = req.body, atendidos = _req$body5.atendidos, asignados = _req$body5.asignados;
            _context12.prev = 1;

            if (!atendidos) {
              _context12.next = 10;
              break;
            }

            _context12.next = 5;
            return _Lead["default"].where({
              statusLead: atendidos
            }).find().countDocuments();

          case 5:
            query = _context12.sent;

            if (!(query >= 0)) {
              _context12.next = 8;
              break;
            }

            return _context12.abrupt("return", res.json({
              leads_atendidos: query
            }));

          case 8:
            _context12.next = 15;
            break;

          case 10:
            _context12.next = 12;
            return _Lead["default"].where({
              status_asignado: asignados
            }).find().countDocuments();

          case 12:
            query2 = _context12.sent;

            if (!(query2 >= 0)) {
              _context12.next = 15;
              break;
            }

            return _context12.abrupt("return", res.json({
              leads_asignados: query2
            }));

          case 15:
            _context12.next = 21;
            break;

          case 17:
            _context12.prev = 17;
            _context12.t0 = _context12["catch"](1);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.status(503).json({
              message: _context12.t0.message
            }));

          case 21:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 17]]);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

leadCtrl.conteoVentasByStatus = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var estado_venta, query;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            estado_venta = req.body.estado_venta;
            _context13.prev = 1;
            _context13.next = 4;
            return _Lead["default"].where({
              status_asignado: true,
              statusLead: true,
              estatus_venta: estado_venta
            }).find().countDocuments();

          case 4:
            query = _context13.sent;

            if (!(query >= 0)) {
              _context13.next = 9;
              break;
            }

            res.json({
              status_elegido: estado_venta,
              countVentas: query
            });
            _context13.next = 10;
            break;

          case 9:
            return _context13.abrupt("return", res.status(404).json({
              message: "No existen ventas en ".concat(estado_venta)
            }));

          case 10:
            _context13.next = 16;
            break;

          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](1);
            console.log(_context13.t0);
            return _context13.abrupt("return", res.status(503).json({
              message: _context13.t0.message
            }));

          case 16:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[1, 12]]);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();

leadCtrl.conteoLeadsAsignadosByVendedor = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _req$body6, sucursal, statusAsignado, start, end, filter, query;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _req$body6 = req.body, sucursal = _req$body6.sucursal, statusAsignado = _req$body6.statusAsignado, start = _req$body6.start, end = _req$body6.end;
            _context14.prev = 1;
            filter = {
              sucursal_lead: sucursal,
              status_asignado: statusAsignado,
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context14.next = 5;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: '$asesorVenta',
                leads_asignados: {
                  $sum: 1
                }
              }
            }]);

          case 5:
            query = _context14.sent;

            if (!(query.length > 0)) {
              _context14.next = 10;
              break;
            }

            res.json({
              nro_vendedores: query.length,
              tablero: query
            });
            _context14.next = 11;
            break;

          case 10:
            return _context14.abrupt("return", res.status(404).json({
              message: 'No existe data aún'
            }));

          case 11:
            _context14.next = 17;
            break;

          case 13:
            _context14.prev = 13;
            _context14.t0 = _context14["catch"](1);
            console.log(_context14.t0);
            return _context14.abrupt("return", res.status(503).json({
              message: _context14.t0.message
            }));

          case 17:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 13]]);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

leadCtrl.conteoLeadsAtendidosByVendedor = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var _req$body7, sucursal, statusAsignado, statusLead, start, end, filter, query;

    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _req$body7 = req.body, sucursal = _req$body7.sucursal, statusAsignado = _req$body7.statusAsignado, statusLead = _req$body7.statusLead, start = _req$body7.start, end = _req$body7.end;
            _context15.prev = 1;
            filter = {
              sucursal_lead: sucursal,
              status_asignado: statusAsignado,
              statusLead: statusLead,
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context15.next = 5;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: '$asesorVenta',
                leads_atendidos: {
                  $sum: 1
                }
              }
            }]);

          case 5:
            query = _context15.sent;

            if (!(query.length > 0)) {
              _context15.next = 10;
              break;
            }

            res.json({
              nro_vendedores: query.length,
              tablero: query
            });
            _context15.next = 11;
            break;

          case 10:
            return _context15.abrupt("return", res.status(404).json({
              message: 'No existe data aún'
            }));

          case 11:
            _context15.next = 17;
            break;

          case 13:
            _context15.prev = 13;
            _context15.t0 = _context15["catch"](1);
            console.log(_context15.t0);
            return _context15.abrupt("return", res.status(503).json({
              message: _context15.t0.message
            }));

          case 17:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 13]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

leadCtrl.conteoLeadsbyOrigen = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var _req$body8, origen, start, end, query;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _req$body8 = req.body, origen = _req$body8.origen, start = _req$body8.start, end = _req$body8.end;
            _context16.prev = 1;
            _context16.next = 4;
            return _Lead["default"].where({
              dataOrigin: origen,
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).find().countDocuments();

          case 4:
            query = _context16.sent;

            if (query.length >= 0) {
              res.json({
                data_origen: origen,
                conteo: query
              });
            }

            _context16.next = 12;
            break;

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16["catch"](1);
            console.log(_context16.t0);
            return _context16.abrupt("return", res.status(503).json({
              message: _context16.t0.message
            }));

          case 12:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 8]]);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

leadCtrl.conteoLeadsAtendidosxModelo = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var _req$body9, sucursal, start, end, filtro, query;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _req$body9 = req.body, sucursal = _req$body9.sucursal, start = _req$body9.start, end = _req$body9.end;
            _context17.prev = 1;
            filtro = {
              sucursal_lead: sucursal,
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context17.next = 5;
            return _Lead["default"].aggregate([{
              $match: filtro
            }, {
              $group: {
                _id: '$modeloVehiculo',
                conteo: {
                  $sum: 1
                }
              }
            }]);

          case 5:
            query = _context17.sent;

            if (!(query.length > 0)) {
              _context17.next = 10;
              break;
            }

            res.json({
              nro_modelos: query.length,
              tablero: query
            });
            _context17.next = 11;
            break;

          case 10:
            return _context17.abrupt("return", res.status(404).json({
              message: 'No existe data aún'
            }));

          case 11:
            _context17.next = 17;
            break;

          case 13:
            _context17.prev = 13;
            _context17.t0 = _context17["catch"](1);
            console.log(_context17.t0);
            return _context17.abrupt("return", res.status(503).json({
              message: _context17.t0.message
            }));

          case 17:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[1, 13]]);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

var _default = leadCtrl;
exports["default"] = _default;
//# sourceMappingURL=lead.controller.js.map