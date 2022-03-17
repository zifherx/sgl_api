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

var _Sucursal = _interopRequireDefault(require("../models/Sucursal"));

var _OriginData = _interopRequireDefault(require("../models/OriginData"));

var _Vehicle = _interopRequireDefault(require("../models/Vehicle"));

var _Financiamiento = _interopRequireDefault(require("../models/Financiamiento"));

var _Banco = _interopRequireDefault(require("../models/Banco"));

var _Seller = _interopRequireDefault(require("../models/Seller"));

var _EstadoConversion = _interopRequireDefault(require("../models/EstadoConversion"));

var _MotivoRechazo = _interopRequireDefault(require("../models/MotivoRechazo"));

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
            return _Lead["default"].find().populate({
              path: "sucursal_lead",
              select: "name"
            }).populate({
              path: "dataOrigin",
              select: "name"
            }).populate({
              path: "tipoFinanciamiento",
              select: "tipo"
            }).populate({
              path: "entidad_bancaria",
              select: "name avatar"
            }).populate({
              path: "estado_conversion",
              select: "name"
            }).populate({
              path: "motivoDesplegable",
              select: "name"
            }).populate({
              path: "auto",
              select: "chasis model cod_tdp, version",
              populate: [{
                path: "chasis",
                select: "name"
              }, {
                path: "model",
                select: "name marca avatar",
                populate: {
                  path: "marca",
                  select: "name avatar"
                }
              }]
            }).populate({
              path: "asesorAsignado",
              select: "name tipo marca avatar",
              populate: {
                path: "marca",
                select: "name avatar"
              }
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 3:
            query = _context.sent;

            if (!(query.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json({
              total: query.length,
              all_leads: query
            });
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: "No existen leads"
            }));

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
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

leadCtrl.getOneById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var leadId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            leadId = req.params.leadId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Lead["default"].findById(leadId).populate({
              path: "sucursal_lead",
              select: "name"
            }).populate({
              path: "dataOrigin",
              select: "name"
            }).populate({
              path: "tipoFinanciamiento",
              select: "name"
            }).populate({
              path: "entidad_bancaria",
              select: "name avatar"
            }).populate({
              path: "estado_conversion",
              select: "name"
            }).populate({
              path: "motivoDesplegable",
              select: "name"
            }).populate({
              path: "auto",
              select: "chasis model cod_tdp version",
              populate: [{
                path: "chasis",
                select: "name"
              }, {
                path: "model",
                select: "name marca avatar",
                populate: {
                  path: "marca",
                  select: "name avatar"
                }
              }]
            }).populate({
              path: "asesorAsignado",
              select: "name tipo marca avatar",
              populate: {
                path: "marca",
                select: "name avatar"
              }
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 4:
            query = _context2.sent;

            if (!query) {
              _context2.next = 9;
              break;
            }

            res.json({
              one: query
            });
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: "No existen el lead"
            }));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
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

leadCtrl.createOne = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, dataOrigin, customer_name, customer_document, customer_city, customer_cellphone, customer_cellphone2, customer_email, fecha_ingreso, createdBy, newObj, originFound, userFound, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, dataOrigin = _req$body.dataOrigin, customer_name = _req$body.customer_name, customer_document = _req$body.customer_document, customer_city = _req$body.customer_city, customer_cellphone = _req$body.customer_cellphone, customer_cellphone2 = _req$body.customer_cellphone2, customer_email = _req$body.customer_email, fecha_ingreso = _req$body.fecha_ingreso, createdBy = _req$body.createdBy;
            _context3.prev = 1;
            newObj = new _Lead["default"]({
              customer_name: customer_name,
              customer_document: customer_document,
              customer_city: customer_city,
              customer_cellphone: customer_cellphone,
              customer_cellphone2: customer_cellphone2,
              customer_email: customer_email,
              fecha_ingreso: fecha_ingreso
            });
            _context3.next = 5;
            return _OriginData["default"].findOne({
              name: dataOrigin
            });

          case 5:
            originFound = _context3.sent;

            if (originFound) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Origen ".concat(dataOrigin, " no encontrada")
            }));

          case 8:
            newObj.dataOrigin = originFound._id;
            _context3.next = 11;
            return _User["default"].findOne({
              username: createdBy
            });

          case 11:
            userFound = _context3.sent;

            if (userFound) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Empleado ".concat(createdBy, " no encontrado")
            }));

          case 14:
            newObj.createdBy = userFound._id;
            _context3.next = 17;
            return newObj.save();

          case 17:
            query = _context3.sent;

            if (query) {
              res.json({
                message: "Lead creado con éxito"
              });
            }

            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 21]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

leadCtrl.isNoInteresado = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var leadId, _req$body2, estado_lead, isNoInteresado, sucursal, fecha_noInteresado, motivoDesplegable, motivo_rechazo, sucursalFound, motivoFound, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body2 = req.body, estado_lead = _req$body2.estado_lead, isNoInteresado = _req$body2.isNoInteresado, sucursal = _req$body2.sucursal, fecha_noInteresado = _req$body2.fecha_noInteresado, motivoDesplegable = _req$body2.motivoDesplegable, motivo_rechazo = _req$body2.motivo_rechazo;
            _context4.prev = 2;
            _context4.next = 5;
            return _Sucursal["default"].findOne({
              name: sucursal
            });

          case 5:
            sucursalFound = _context4.sent;

            if (sucursalFound) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Sucursal ".concat(sucursal, " no encontrada")
            }));

          case 8:
            _context4.next = 10;
            return _MotivoRechazo["default"].findOne({
              name: motivoDesplegable
            });

          case 10:
            motivoFound = _context4.sent;

            if (motivoFound) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Motivo ".concat(motivoDesplegable, " no encontrado")
            }));

          case 13:
            _context4.next = 15;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_lead: estado_lead,
              isNoInteresado: isNoInteresado,
              sucursal_lead: sucursalFound._id,
              fecha_noInteresado: fecha_noInteresado,
              motivoDesplegable: motivoFound._id,
              motivo_rechazo: motivo_rechazo
            });

          case 15:
            query = _context4.sent;

            if (!query) {
              _context4.next = 20;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context4.next = 21;
            break;

          case 20:
            return _context4.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 21:
            _context4.next = 27;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 23]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

leadCtrl.isAtendido = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var leadId, _req$body3, estado_lead, isAtendido, fecha_atencion, comentario, observacion, sucursal, auto, financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad, query, sucursalFound, autoFound, financiamientoFound, bancoFound;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body3 = req.body, estado_lead = _req$body3.estado_lead, isAtendido = _req$body3.isAtendido, fecha_atencion = _req$body3.fecha_atencion, comentario = _req$body3.comentario, observacion = _req$body3.observacion, sucursal = _req$body3.sucursal, auto = _req$body3.auto, financiamiento = _req$body3.financiamiento, entidad_bancaria = _req$body3.entidad_bancaria, tentativa_inicial = _req$body3.tentativa_inicial, precioUnidad = _req$body3.precioUnidad;
            _context5.prev = 2;
            query = null;
            _context5.next = 6;
            return _Sucursal["default"].findOne({
              name: sucursal
            });

          case 6:
            sucursalFound = _context5.sent;
            _context5.next = 9;
            return _Vehicle["default"].findOne({
              cod_tdp: auto
            });

          case 9:
            autoFound = _context5.sent;
            _context5.next = 12;
            return _Financiamiento["default"].findOne({
              name: financiamiento
            });

          case 12:
            financiamientoFound = _context5.sent;

            if (sucursalFound) {
              _context5.next = 15;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Sucursal ".concat(sucursal, " no encontrada")
            }));

          case 15:
            if (autoFound) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Veh\xEDculo ".concat(auto, " no encontrado")
            }));

          case 17:
            if (financiamientoFound) {
              _context5.next = 19;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Tipo de financiamiento ".concat(financiamiento, " no encontrado")
            }));

          case 19:
            if (!(entidad_bancaria == null || entidad_bancaria == undefined)) {
              _context5.next = 25;
              break;
            }

            _context5.next = 22;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              sucursal_lead: sucursalFound._id,
              estado_lead: estado_lead,
              isAtendido: isAtendido,
              fecha_atencion: fecha_atencion,
              comentario: comentario,
              observacion: observacion,
              auto: autoFound._id,
              tipoFinanciamiento: financiamientoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad
            });

          case 22:
            query = _context5.sent;
            _context5.next = 33;
            break;

          case 25:
            _context5.next = 27;
            return _Banco["default"].findOne({
              name: entidad_bancaria
            });

          case 27:
            bancoFound = _context5.sent;

            if (bancoFound) {
              _context5.next = 30;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Entidad ".concat(entidad_bancaria, " no encontrado")
            }));

          case 30:
            _context5.next = 32;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              sucursal_lead: sucursalFound._id,
              estado_lead: estado_lead,
              isAtendido: isAtendido,
              fecha_atencion: fecha_atencion,
              comentario: comentario,
              observacion: observacion,
              auto: autoFound._id,
              tipoFinanciamiento: financiamientoFound._id,
              entidad_bancaria: bancoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad
            });

          case 32:
            query = _context5.sent;

          case 33:
            if (!query) {
              _context5.next = 37;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context5.next = 38;
            break;

          case 37:
            return _context5.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 38:
            _context5.next = 44;
            break;

          case 40:
            _context5.prev = 40;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 44:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 40]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

leadCtrl.isAsignacion = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var leadId, _req$body4, estado_lead, isAsignado, fecha_asignacion, comentario, observacion, asesorAsignado, auto, financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad, query, asesorFound, autoFound, financiamientoFound, bancoFound;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body4 = req.body, estado_lead = _req$body4.estado_lead, isAsignado = _req$body4.isAsignado, fecha_asignacion = _req$body4.fecha_asignacion, comentario = _req$body4.comentario, observacion = _req$body4.observacion, asesorAsignado = _req$body4.asesorAsignado, auto = _req$body4.auto, financiamiento = _req$body4.financiamiento, entidad_bancaria = _req$body4.entidad_bancaria, tentativa_inicial = _req$body4.tentativa_inicial, precioUnidad = _req$body4.precioUnidad;
            _context6.prev = 2;
            query = null;
            _context6.next = 6;
            return _Seller["default"].findOne({
              name: asesorAsignado
            });

          case 6:
            asesorFound = _context6.sent;
            _context6.next = 9;
            return _Vehicle["default"].findOne({
              cod_tdp: auto
            });

          case 9:
            autoFound = _context6.sent;
            _context6.next = 12;
            return _Financiamiento["default"].findOne({
              name: financiamiento
            });

          case 12:
            financiamientoFound = _context6.sent;

            if (asesorFound) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Asesor ".concat(asesorAsignado, " no encontrado")
            }));

          case 15:
            if (autoFound) {
              _context6.next = 17;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Veh\xEDculo ".concat(auto, " no encontrado")
            }));

          case 17:
            if (financiamientoFound) {
              _context6.next = 19;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Tipo de financiamiento ".concat(financiamiento, " no encontrado")
            }));

          case 19:
            if (!(entidad_bancaria == null || entidad_bancaria == undefined)) {
              _context6.next = 25;
              break;
            }

            _context6.next = 22;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_lead: estado_lead,
              isAsignado: isAsignado,
              fecha_asignacion: fecha_asignacion,
              comentario: comentario,
              observacion: observacion,
              asesorAsignado: asesorFound._id,
              auto: autoFound._id,
              tipoFinanciamiento: financiamientoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad
            });

          case 22:
            query = _context6.sent;
            _context6.next = 33;
            break;

          case 25:
            _context6.next = 27;
            return _Banco["default"].findOne({
              name: entidad_bancaria
            });

          case 27:
            bancoFound = _context6.sent;

            if (bancoFound) {
              _context6.next = 30;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Entidad ".concat(entidad_bancaria, " no encontrado")
            }));

          case 30:
            _context6.next = 32;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_lead: estado_lead,
              isAsignado: isAsignado,
              fecha_asignacion: fecha_asignacion,
              comentario: comentario,
              observacion: observacion,
              asesorAsignado: asesorFound._id,
              auto: autoFound._id,
              tipoFinanciamiento: financiamientoFound._id,
              entidad_bancaria: bancoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad
            });

          case 32:
            query = _context6.sent;

          case 33:
            if (!query) {
              _context6.next = 37;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context6.next = 38;
            break;

          case 37:
            return _context6.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 38:
            _context6.next = 44;
            break;

          case 40:
            _context6.prev = 40;
            _context6.t0 = _context6["catch"](2);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

          case 44:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 40]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

leadCtrl.isCotizado = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var leadId, _req$body5, financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad, estado_lead, isCotizado, fecha_cotizacion, comentario, observacion, query, financiamientoFound, bancoFound;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body5 = req.body, financiamiento = _req$body5.financiamiento, entidad_bancaria = _req$body5.entidad_bancaria, tentativa_inicial = _req$body5.tentativa_inicial, precioUnidad = _req$body5.precioUnidad, estado_lead = _req$body5.estado_lead, isCotizado = _req$body5.isCotizado, fecha_cotizacion = _req$body5.fecha_cotizacion, comentario = _req$body5.comentario, observacion = _req$body5.observacion;
            _context7.prev = 2;
            query = null;
            _context7.next = 6;
            return _Financiamiento["default"].findOne({
              name: financiamiento
            });

          case 6:
            financiamientoFound = _context7.sent;

            if (financiamientoFound) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Tipo de financiamiento ".concat(financiamiento, " no encontrado")
            }));

          case 9:
            if (!(entidad_bancaria == null || entidad_bancaria == undefined)) {
              _context7.next = 15;
              break;
            }

            _context7.next = 12;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              tipoFinanciamiento: financiamientoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad,
              estado_lead: estado_lead,
              isCotizado: isCotizado,
              fecha_cotizacion: fecha_cotizacion,
              comentario: comentario,
              observacion: observacion
            });

          case 12:
            query = _context7.sent;
            _context7.next = 23;
            break;

          case 15:
            _context7.next = 17;
            return _Banco["default"].findOne({
              name: entidad_bancaria
            });

          case 17:
            bancoFound = _context7.sent;

            if (bancoFound) {
              _context7.next = 20;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Entidad ".concat(entidad_bancaria, " no encontrado")
            }));

          case 20:
            _context7.next = 22;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              tipoFinanciamiento: financiamientoFound._id,
              entidad_bancaria: bancoFound._id,
              tentativa_inicial: tentativa_inicial,
              precioUnidad: precioUnidad,
              estado_lead: estado_lead,
              isCotizado: isCotizado,
              fecha_cotizacion: fecha_cotizacion,
              comentario: comentario,
              observacion: observacion
            });

          case 22:
            query = _context7.sent;

          case 23:
            if (!query) {
              _context7.next = 27;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context7.next = 28;
            break;

          case 27:
            return _context7.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 28:
            _context7.next = 34;
            break;

          case 30:
            _context7.prev = 30;
            _context7.t0 = _context7["catch"](2);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              message: _context7.t0.message
            }));

          case 34:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 30]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

leadCtrl.isDeclinado = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var leadId, _req$body6, estado_lead, isDeclinado, fecha_declinado, motivo_desistencia, comentario, observacion, query;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body6 = req.body, estado_lead = _req$body6.estado_lead, isDeclinado = _req$body6.isDeclinado, fecha_declinado = _req$body6.fecha_declinado, motivo_desistencia = _req$body6.motivo_desistencia, comentario = _req$body6.comentario, observacion = _req$body6.observacion;
            _context8.prev = 2;
            _context8.next = 5;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_lead: estado_lead,
              isDeclinado: isDeclinado,
              fecha_declinado: fecha_declinado,
              motivo_desistencia: motivo_desistencia,
              comentario: comentario,
              observacion: observacion
            });

          case 5:
            query = _context8.sent;

            if (!query) {
              _context8.next = 10;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context8.next = 11;
            break;

          case 10:
            return _context8.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 11:
            _context8.next = 17;
            break;

          case 13:
            _context8.prev = 13;
            _context8.t0 = _context8["catch"](2);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              message: _context8.t0.message
            }));

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 13]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

leadCtrl.isConvertido = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var leadId, _req$body7, estado_lead, estado_conversion, isConvertido, fecha_conversion, statusFound, query;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body7 = req.body, estado_lead = _req$body7.estado_lead, estado_conversion = _req$body7.estado_conversion, isConvertido = _req$body7.isConvertido, fecha_conversion = _req$body7.fecha_conversion;
            _context9.prev = 2;
            _context9.next = 5;
            return _EstadoConversion["default"].findOne({
              name: estado_conversion
            });

          case 5:
            statusFound = _context9.sent;

            if (statusFound) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", res.status(404).json({
              message: "Estado ".concat(estado_conversion, " no encontrado")
            }));

          case 8:
            _context9.next = 10;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_lead: estado_lead,
              estado_conversion: statusFound._id,
              isConvertido: isConvertido,
              fecha_conversion: fecha_conversion
            });

          case 10:
            query = _context9.sent;

            if (!query) {
              _context9.next = 15;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context9.next = 16;
            break;

          case 15:
            return _context9.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 16:
            _context9.next = 22;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](2);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(503).json({
              message: _context9.t0.message
            }));

          case 22:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[2, 18]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

leadCtrl.isBooking = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var leadId, _req$body8, estado_conversion, isBooking, fecha_booking, statusFound, query;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body8 = req.body, estado_conversion = _req$body8.estado_conversion, isBooking = _req$body8.isBooking, fecha_booking = _req$body8.fecha_booking;
            _context10.prev = 2;
            _context10.next = 5;
            return _EstadoConversion["default"].findOne({
              name: estado_conversion
            });

          case 5:
            statusFound = _context10.sent;

            if (statusFound) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.status(404).json({
              message: "Estado ".concat(estado_conversion, " no encontrado")
            }));

          case 8:
            _context10.next = 10;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_conversion: statusFound._id,
              isBooking: isBooking,
              fecha_booking: fecha_booking
            });

          case 10:
            query = _context10.sent;

            if (!query) {
              _context10.next = 15;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context10.next = 16;
            break;

          case 15:
            return _context10.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 16:
            _context10.next = 22;
            break;

          case 18:
            _context10.prev = 18;
            _context10.t0 = _context10["catch"](2);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(503).json({
              message: _context10.t0.message
            }));

          case 22:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 18]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

leadCtrl.isDown = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var leadId, _req$body9, estado_conversion, isDown, fecha_down, statusFound, query;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body9 = req.body, estado_conversion = _req$body9.estado_conversion, isDown = _req$body9.isDown, fecha_down = _req$body9.fecha_down;
            _context11.prev = 2;
            _context11.next = 5;
            return _EstadoConversion["default"].findOne({
              name: estado_conversion
            });

          case 5:
            statusFound = _context11.sent;

            if (statusFound) {
              _context11.next = 8;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              message: "Estado ".concat(estado_conversion, " no encontrado")
            }));

          case 8:
            _context11.next = 10;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_conversion: statusFound._id,
              isDown: isDown,
              fecha_down: fecha_down
            });

          case 10:
            query = _context11.sent;

            if (!query) {
              _context11.next = 15;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context11.next = 16;
            break;

          case 15:
            return _context11.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 16:
            _context11.next = 22;
            break;

          case 18:
            _context11.prev = 18;
            _context11.t0 = _context11["catch"](2);
            console.log(_context11.t0);
            return _context11.abrupt("return", res.status(503).json({
              message: _context11.t0.message
            }));

          case 22:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 18]]);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

leadCtrl.isVenta = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var leadId, _req$body10, estado_conversion, isVenta, fecha_venta, statusFound, query;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            leadId = req.params.leadId;
            _req$body10 = req.body, estado_conversion = _req$body10.estado_conversion, isVenta = _req$body10.isVenta, fecha_venta = _req$body10.fecha_venta;
            _context12.prev = 2;
            _context12.next = 5;
            return _EstadoConversion["default"].findOne({
              name: estado_conversion
            });

          case 5:
            statusFound = _context12.sent;

            if (statusFound) {
              _context12.next = 8;
              break;
            }

            return _context12.abrupt("return", res.status(404).json({
              message: "Estado ".concat(estado_conversion, " no encontrado")
            }));

          case 8:
            _context12.next = 10;
            return _Lead["default"].findByIdAndUpdate(leadId, {
              estado_conversion: statusFound._id,
              isVenta: isVenta,
              fecha_venta: fecha_venta
            });

          case 10:
            query = _context12.sent;

            if (!query) {
              _context12.next = 15;
              break;
            }

            res.json({
              message: "Lead actualizado con éxito"
            });
            _context12.next = 16;
            break;

          case 15:
            return _context12.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para actualizar"
            }));

          case 16:
            _context12.next = 22;
            break;

          case 18:
            _context12.prev = 18;
            _context12.t0 = _context12["catch"](2);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.status(503).json({
              message: _context12.t0.message
            }));

          case 22:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[2, 18]]);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

leadCtrl.deleteOneById = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var leadId, query;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            leadId = req.params.leadId;
            _context13.prev = 1;
            _context13.next = 4;
            return _Lead["default"].findByIdAndDelete(leadId);

          case 4:
            query = _context13.sent;

            if (!query) {
              _context13.next = 9;
              break;
            }

            res.json({
              message: "Lead eliminado con éxito"
            });
            _context13.next = 10;
            break;

          case 9:
            return _context13.abrupt("return", res.status(404).json({
              message: "Lead no encontrado para eliminar"
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

leadCtrl.leadsBySucursalFecha = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _req$body11, start, end, query;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _req$body11 = req.body, start = _req$body11.start, end = _req$body11.end;
            _context14.prev = 1;
            _context14.next = 4;
            return _Lead["default"].find({
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).sort({
              fecha_ingreso: -1
            }).populate({
              path: "sucursal_lead",
              select: "name"
            }).populate({
              path: "dataOrigin",
              select: "name"
            }).populate({
              path: "tipoFinanciamiento",
              select: "tipo"
            }).populate({
              path: "entidad_bancaria",
              select: "name avatar"
            }).populate({
              path: "estado_conversion",
              select: "name"
            }).populate({
              path: "auto",
              select: "chasis model cod_tdp, version",
              populate: [{
                path: "chasis",
                select: "name"
              }, {
                path: "model",
                select: "name marca avatar",
                populate: {
                  path: "marca",
                  select: "name avatar"
                }
              }]
            }).populate({
              path: "asesorAsignado",
              select: "name tipo marca avatar",
              populate: {
                path: "marca",
                select: "name avatar"
              }
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 4:
            query = _context14.sent;

            if (!(query.length > 0)) {
              _context14.next = 9;
              break;
            }

            res.json({
              total: query.length,
              leads: query
            });
            _context14.next = 10;
            break;

          case 9:
            return _context14.abrupt("return", res.status(404).json({
              message: "No existen leads"
            }));

          case 10:
            _context14.next = 16;
            break;

          case 12:
            _context14.prev = 12;
            _context14.t0 = _context14["catch"](1);
            console.log(_context14.t0);
            return _context14.abrupt("return", res.status(503).json({
              message: _context14.t0.message
            }));

          case 16:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 12]]);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

leadCtrl.leadsByStatusFecha = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var _req$body12, estado_lead, start, end, query;

    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _req$body12 = req.body, estado_lead = _req$body12.estado_lead, start = _req$body12.start, end = _req$body12.end;
            _context15.prev = 1;
            _context15.next = 4;
            return _Lead["default"].find({
              estado_lead: estado_lead,
              isConvertido: true,
              fecha_conversion: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).sort({
              fecha_conversion: -1
            }).populate({
              path: "sucursal_lead",
              select: "name"
            }).populate({
              path: "dataOrigin",
              select: "name"
            }).populate({
              path: "tipoFinanciamiento",
              select: "tipo"
            }).populate({
              path: "entidad_bancaria",
              select: "name avatar"
            }).populate({
              path: "estado_conversion",
              select: "name"
            }).populate({
              path: "auto",
              select: "chasis model cod_tdp, version",
              populate: [{
                path: "chasis",
                select: "name"
              }, {
                path: "model",
                select: "name marca avatar",
                populate: {
                  path: "marca",
                  select: "name avatar"
                }
              }]
            }).populate({
              path: "asesorAsignado",
              select: "name tipo marca avatar",
              populate: {
                path: "marca",
                select: "name avatar"
              }
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 4:
            query = _context15.sent;

            if (!(query.length > 0)) {
              _context15.next = 9;
              break;
            }

            res.json({
              total: query.length,
              leads: query
            });
            _context15.next = 10;
            break;

          case 9:
            return _context15.abrupt("return", res.status(404).json({
              message: "No existen leads"
            }));

          case 10:
            _context15.next = 16;
            break;

          case 12:
            _context15.prev = 12;
            _context15.t0 = _context15["catch"](1);
            console.log(_context15.t0);
            return _context15.abrupt("return", res.status(503).json({
              message: _context15.t0.message
            }));

          case 16:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 12]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();

leadCtrl.rankingLeadsConversionByDates = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var _req$body13, start, end, filter, query;

    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _req$body13 = req.body, start = _req$body13.start, end = _req$body13.end;
            _context16.prev = 1;
            filter = {
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context16.next = 5;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: "$estado_conversion",
                num_leads: {
                  $sum: 1
                }
              }
            }, {
              $sort: {
                num_leads: -1
              }
            }]);

          case 5:
            query = _context16.sent;

            if (!(query.length > 0)) {
              _context16.next = 10;
              break;
            }

            res.json({
              total: query.length,
              ranking: query
            });
            _context16.next = 11;
            break;

          case 10:
            return _context16.abrupt("return", res.status(404).json({
              message: "No existen leads aún"
            }));

          case 11:
            _context16.next = 17;
            break;

          case 13:
            _context16.prev = 13;
            _context16.t0 = _context16["catch"](1);
            console.log(_context16.t0);
            return _context16.abrupt("return", res.status(503).json({
              message: _context16.t0.message
            }));

          case 17:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[1, 13]]);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

leadCtrl.countLeadsByDates = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var _req$body14, estado, start, end, query;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _req$body14 = req.body, estado = _req$body14.estado, start = _req$body14.start, end = _req$body14.end;
            _context17.prev = 1;
            _context17.next = 4;
            return _Lead["default"].find({
              estado_lead: {
                $regex: ".*" + estado + ".*"
              },
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).countDocuments();

          case 4:
            query = _context17.sent;

            if (query >= 0) {
              res.json({
                qty: query
              });
            }

            _context17.next = 12;
            break;

          case 8:
            _context17.prev = 8;
            _context17.t0 = _context17["catch"](1);
            console.log(_context17.t0);
            return _context17.abrupt("return", res.status(503).json({
              message: _context17.t0.message
            }));

          case 12:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[1, 8]]);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

leadCtrl.countLeadsConversionyDates = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var _req$body15, isBooking, isVenta, start, end, query;

    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _req$body15 = req.body, isBooking = _req$body15.isBooking, isVenta = _req$body15.isVenta, start = _req$body15.start, end = _req$body15.end;
            _context18.prev = 1;
            // const conversionState = await EstadoConversion.findOne({ name: estado });
            query = null;

            if (!isVenta) {
              _context18.next = 9;
              break;
            }

            _context18.next = 6;
            return _Lead["default"].find({
              // estado_conversion: conversionState._id,
              isBooking: isBooking,
              isVenta: isVenta,
              fecha_conversion: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).countDocuments();

          case 6:
            query = _context18.sent;
            _context18.next = 12;
            break;

          case 9:
            _context18.next = 11;
            return _Lead["default"].find({
              // estado_conversion: conversionState._id,
              isBooking: isBooking,
              fecha_conversion: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            }).countDocuments();

          case 11:
            query = _context18.sent;

          case 12:
            if (query >= 0) {
              res.json({
                qty: query
              });
            }

            _context18.next = 19;
            break;

          case 15:
            _context18.prev = 15;
            _context18.t0 = _context18["catch"](1);
            console.log(_context18.t0);
            return _context18.abrupt("return", res.status(503).json({
              message: _context18.t0.message
            }));

          case 19:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[1, 15]]);
  }));

  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();

leadCtrl.rankingLeadsByOriginDataDateConversion = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var _req$body16, start, end, estado_lead, isAsignado, isBooking, isVenta, query, filter;

    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _req$body16 = req.body, start = _req$body16.start, end = _req$body16.end, estado_lead = _req$body16.estado_lead, isAsignado = _req$body16.isAsignado, isBooking = _req$body16.isBooking, isVenta = _req$body16.isVenta;
            query = null;
            filter = null;
            _context19.prev = 3;

            if (!estado_lead) {
              _context19.next = 11;
              break;
            }

            filter = {
              estado_lead: estado_lead,
              isAsignado: isAsignado,
              fecha_ingreso: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context19.next = 8;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: "$dataOrigin",
                totalLeads: {
                  $sum: 1
                }
              }
            }, {
              $sort: {
                totalLeads: -1
              }
            }]);

          case 8:
            query = _context19.sent;
            _context19.next = 23;
            break;

          case 11:
            if (!isBooking) {
              _context19.next = 18;
              break;
            }

            filter = {
              isBooking: isBooking,
              fecha_conversion: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context19.next = 15;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: "$dataOrigin",
                totalLeads: {
                  $sum: 1
                }
              }
            }, {
              $sort: {
                totalLeads: -1
              }
            }]);

          case 15:
            query = _context19.sent;
            _context19.next = 23;
            break;

          case 18:
            if (!isVenta) {
              _context19.next = 23;
              break;
            }

            filter = {
              isVenta: isVenta,
              fecha_conversion: {
                $gte: new Date(start),
                $lte: new Date(end)
              }
            };
            _context19.next = 22;
            return _Lead["default"].aggregate([{
              $match: filter
            }, {
              $group: {
                _id: "$dataOrigin",
                totalLeads: {
                  $sum: 1
                }
              }
            }, {
              $sort: {
                totalLeads: -1
              }
            }]);

          case 22:
            query = _context19.sent;

          case 23:
            if (!(query.length > 0)) {
              _context19.next = 27;
              break;
            }

            res.json({
              total: query.length,
              ranking: query
            });
            _context19.next = 28;
            break;

          case 27:
            return _context19.abrupt("return", res.status(404).json({
              message: "No existen leads aún"
            }));

          case 28:
            _context19.next = 34;
            break;

          case 30:
            _context19.prev = 30;
            _context19.t0 = _context19["catch"](3);
            console.log(_context19.t0);
            return _context19.abrupt("return", res.status(503).json({
              message: _context19.t0.message
            }));

          case 34:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[3, 30]]);
  }));

  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();

leadCtrl.leadsModificados = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var _req$body17, start, end, query;

    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _req$body17 = req.body, start = _req$body17.start, end = _req$body17.end;
            _context20.prev = 1;
            _context20.next = 4;
            return _Lead["default"].find({
              updatedAt: {
                $gte: new Date(start),
                $lt: new Date(end)
              } // createdAt: { $ne: new Date(start)}

            }).sort({
              customer_name: 1
            }).populate({
              path: "sucursal_lead",
              select: "name"
            }).populate({
              path: "dataOrigin",
              select: "name"
            }).populate({
              path: "tipoFinanciamiento",
              select: "tipo"
            }).populate({
              path: "entidad_bancaria",
              select: "name avatar"
            }).populate({
              path: "estado_conversion",
              select: "name"
            }).populate({
              path: "motivoDesplegable",
              select: "name"
            }).populate({
              path: "auto",
              select: "chasis model cod_tdp, version",
              populate: [{
                path: "chasis",
                select: "name"
              }, {
                path: "model",
                select: "name marca avatar",
                populate: {
                  path: "marca",
                  select: "name avatar"
                }
              }]
            }).populate({
              path: "asesorAsignado",
              select: "name tipo marca avatar",
              populate: {
                path: "marca",
                select: "name avatar"
              }
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 4:
            query = _context20.sent;

            if (!(query.length > 0)) {
              _context20.next = 9;
              break;
            }

            res.json({
              total: query.length,
              all: query
            });
            _context20.next = 10;
            break;

          case 9:
            return _context20.abrupt("return", res.status(404).json({
              message: 'No se encontraron leads'
            }));

          case 10:
            _context20.next = 16;
            break;

          case 12:
            _context20.prev = 12;
            _context20.t0 = _context20["catch"](1);
            console.log(_context20.t0);
            return _context20.abrupt("return", res.status(503).json({
              message: _context20.t0.message
            }));

          case 16:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[1, 12]]);
  }));

  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();

var _default = leadCtrl;
exports["default"] = _default;
//# sourceMappingURL=lead.controller.js.map