"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModelo = exports.getModelsByMarca = exports.getModelos = exports.getModeloById = exports.getModeloByActivo = exports.getCountAll = exports.deleteModelo = exports.createModelo = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Modelo = _interopRequireDefault(require("../models/Modelo"));

var _User = _interopRequireDefault(require("../models/User"));

var _Marca = _interopRequireDefault(require("../models/Marca"));

var getModelos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Modelo["default"].find().sort({
              name: 'asc'
            }).populate({
              path: 'marca',
              select: 'name avatar'
            }).populate({
              path: 'createdBy',
              select: 'name username'
            });

          case 3:
            query = _context.sent;

            if (!(query.length > 0)) {
              _context.next = 8;
              break;
            }

            res.json({
              total_models: query.length,
              all_models: query
            });
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: 'No existen Modelos'
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

  return function getModelos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getModelos = getModelos;

var getModeloById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var modeloId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            modeloId = req.params.modeloId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Modelo["default"].findById(modeloId).populate({
              path: 'marca',
              select: 'name avatar'
            }).populate({
              path: 'createdBy',
              select: 'name username'
            });

          case 4:
            query = _context2.sent;

            if (!query) {
              _context2.next = 9;
              break;
            }

            res.json({
              modelo: query
            });
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

  return function getModeloById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getModeloById = getModeloById;

var getModeloByActivo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var query;
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
            }).populate({
              path: 'marca',
              select: 'name avatar'
            }).populate({
              path: 'createdBy',
              select: 'name username'
            });

          case 3:
            query = _context3.sent;

            if (!(query.length > 0)) {
              _context3.next = 8;
              break;
            }

            res.json({
              total_active: query.length,
              active_models: query
            });
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

  return function getModeloByActivo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getModeloByActivo = getModeloByActivo;

var createModelo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, name, marca, status, createdBy, avatar, obj, userFound, marcaFound, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, marca = _req$body.marca, status = _req$body.status, createdBy = _req$body.createdBy;
            avatar = req.file;
            _context4.prev = 2;
            obj = null;
            _context4.next = 6;
            return _User["default"].findOne({
              username: createdBy
            });

          case 6:
            userFound = _context4.sent;

            if (userFound) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "No existe la usuario ".concat(createdBy)
            }));

          case 9:
            _context4.next = 11;
            return _Marca["default"].findOne({
              name: marca
            });

          case 11:
            marcaFound = _context4.sent;

            if (marcaFound) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "No existe la marca ".concat(marca)
            }));

          case 14:
            if (avatar == undefined || avatar == null) {
              obj = new _Modelo["default"]({
                name: name,
                status: status
              });
              obj.marca = marcaFound._id;
              obj.createdBy = userFound._id;
            } else {
              obj = new _Modelo["default"]({
                name: name,
                status: status
              });
              obj.marca = marcaFound._id;
              obj.createdBy = userFound._id;
              obj.avatar = avatar.location;
            }

            _context4.next = 17;
            return obj.save();

          case 17:
            query = _context4.sent;

            if (query) {
              res.json({
                message: 'Modelo creado con éxito'
              });
            }

            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](2);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 21]]);
  }));

  return function createModelo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createModelo = createModelo;

var updateModelo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var modeloId, _req$body2, name, marca, status, avatar, query, marcaFound;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            modeloId = req.params.modeloId;
            _req$body2 = req.body, name = _req$body2.name, marca = _req$body2.marca, status = _req$body2.status;
            avatar = req.file;
            _context5.prev = 3;
            query = null;
            _context5.next = 7;
            return _Marca["default"].findOne({
              name: marca
            });

          case 7:
            marcaFound = _context5.sent;

            if (marcaFound) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "No existe la marca ".concat(marca)
            }));

          case 10:
            if (!(avatar == undefined || avatar == null)) {
              _context5.next = 16;
              break;
            }

            _context5.next = 13;
            return _Modelo["default"].findByIdAndUpdate(modeloId, {
              name: name,
              status: status,
              marca: marcaFound._id
            });

          case 13:
            query = _context5.sent;
            _context5.next = 19;
            break;

          case 16:
            _context5.next = 18;
            return _Modelo["default"].findByIdAndUpdate(modeloId, {
              name: name,
              status: status,
              marca: marcaFound._id,
              avatar: avatar.location
            });

          case 18:
            query = _context5.sent;

          case 19:
            if (!query) {
              _context5.next = 23;
              break;
            }

            res.json({
              message: 'Modelo actualizado con éxito'
            });
            _context5.next = 24;
            break;

          case 23:
            return _context5.abrupt("return", res.status(404).json({
              message: 'No existe Modelo a actualizar'
            }));

          case 24:
            _context5.next = 30;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t0 = _context5["catch"](3);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 30:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 26]]);
  }));

  return function updateModelo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateModelo = updateModelo;

var deleteModelo = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var modeloId, query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            modeloId = req.params.modeloId;
            _context6.prev = 1;
            _context6.next = 4;
            return _Modelo["default"].findByIdAndDelete(modeloId);

          case 4:
            query = _context6.sent;

            if (!query) {
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
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

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

var getCountAll = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _Modelo["default"].find().countDocuments();

          case 3:
            query = _context7.sent;

            if (query >= 0) {
              res.json({
                total: query
              });
            }

            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              message: _context7.t0.message
            }));

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function getCountAll(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getCountAll = getCountAll;

var getModelsByMarca = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var marca, marcaFound, query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            marca = req.body.marca;
            _context8.prev = 1;
            _context8.next = 4;
            return _Marca["default"].findOne({
              name: marca
            });

          case 4:
            marcaFound = _context8.sent;

            if (marcaFound) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              message: "Marca ".concat(marca, " no encontrada")
            }));

          case 7:
            _context8.next = 9;
            return _Modelo["default"].find({
              marca: marcaFound._id
            }).sort({
              name: 1
            });

          case 9:
            query = _context8.sent;

            if (!(query.length > 0)) {
              _context8.next = 14;
              break;
            }

            res.json({
              count: query.length,
              models: query
            });
            _context8.next = 15;
            break;

          case 14:
            return _context8.abrupt("return", res.status(404).json({
              message: "Marca ".concat(marca, " no tiene modelos")
            }));

          case 15:
            _context8.next = 21;
            break;

          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              message: _context8.t0.message
            }));

          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 17]]);
  }));

  return function getModelsByMarca(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getModelsByMarca = getModelsByMarca;
//# sourceMappingURL=modelo.controller.js.map