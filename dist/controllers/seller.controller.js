"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Seller = _interopRequireDefault(require("../models/Seller"));

var _User = _interopRequireDefault(require("../models/User"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var sellerCtrl = {};

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // secure: true

});

sellerCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Seller["default"].find().sort({
              name: 'asc'
            }).populate('userCreator');

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
              message: 'No existen Asesores de Ventas'
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

sellerCtrl.getOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var sellerId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sellerId = req.params.sellerId;
            _context2.prev = 1;
            _context2.next = 4;
            return _Seller["default"].findById(sellerId).populate('userCreator');

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
              message: 'No existe el Asesor de Ventas'
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

sellerCtrl.createSeller = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, document, sucursal, userCreator, newSeller, userFound, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, document = _req$body.document, sucursal = _req$body.sucursal, userCreator = _req$body.userCreator;
            _context3.prev = 1;
            newSeller = new _Seller["default"]({
              name: name,
              document: document,
              sucursal: sucursal
            });
            _context3.next = 5;
            return _User["default"].find({
              username: userCreator
            });

          case 5:
            userFound = _context3.sent;
            newSeller.userCreator = userFound.map(function (a) {
              return a._id;
            });
            _context3.next = 9;
            return newSeller.save();

          case 9:
            query = _context3.sent;

            if (query) {
              res.json({
                message: 'Asesor de Ventas creado con éxito'
              });
            }

            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            console.error(_context3.t0);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t0.message
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

sellerCtrl.updateSeller = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var sellerId, _req$body2, name, document, sucursal, status, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sellerId = req.params.sellerId;
            _req$body2 = req.body, name = _req$body2.name, document = _req$body2.document, sucursal = _req$body2.sucursal, status = _req$body2.status;
            _context4.prev = 2;
            _context4.next = 5;
            return _Seller["default"].findByIdAndUpdate(sellerId, {
              name: name,
              document: document,
              sucursal: sucursal,
              status: status
            });

          case 5:
            query = _context4.sent;

            if (!query) {
              _context4.next = 10;
              break;
            }

            res.json({
              message: 'Asesor de Ventas actualizado con éxito'
            });
            _context4.next = 11;
            break;

          case 10:
            return _context4.abrupt("return", res.status(404).json({
              message: 'Asesor de Ventas no encontrado'
            }));

          case 11:
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

sellerCtrl.deleteSeller = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var sellerId, query;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            sellerId = req.params.sellerId;
            _context5.prev = 1;
            _context5.next = 4;
            return _Seller["default"].findByIdAndRemove(sellerId);

          case 4:
            query = _context5.sent;

            if (!query) {
              _context5.next = 9;
              break;
            }

            res.json({
              message: 'Asesor de Ventas eliminado con éxito'
            });
            _context5.next = 10;
            break;

          case 9:
            return _context5.abrupt("return", res.status(404).json({
              message: 'Asesor de Ventas no encontrado'
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

sellerCtrl.getCountAll = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Seller["default"].estimatedDocumentCount();

          case 3:
            query = _context6.sent;

            if (query >= 0) {
              res.json({
                nro_seller: query
              });
            }

            _context6.next = 11;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              message: _context6.t0.message
            }));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

sellerCtrl.getSellersByActive = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _Seller["default"].find({
              status: true
            }).sort({
              name: 'asc'
            });

          case 3:
            query = _context7.sent;

            if (!(query.length > 0)) {
              _context7.next = 8;
              break;
            }

            res.json(query);
            _context7.next = 9;
            break;

          case 8:
            return _context7.abrupt("return", res.status(404).json({
              message: 'No existen Asesores de Ventas Activos'
            }));

          case 9:
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              message: _context7.t0.message
            }));

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 11]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

sellerCtrl.getSellersBySucursal = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var sucursal_seller, query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            sucursal_seller = req.body.sucursal_seller;
            _context8.prev = 1;
            _context8.next = 4;
            return _Seller["default"].find({
              sucursal: sucursal_seller
            }).sort({
              name: 'asc'
            });

          case 4:
            query = _context8.sent;

            if (!(query.length > 0)) {
              _context8.next = 9;
              break;
            }

            res.json(query);
            _context8.next = 10;
            break;

          case 9:
            return _context8.abrupt("return", res.status(404).json({
              message: "No existen Asesores de Ventas en ".concat(sucursal_seller)
            }));

          case 10:
            _context8.next = 16;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](1);
            console.error(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              message: _context8.t0.message
            }));

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 12]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

sellerCtrl.updatePhoto = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var sellerId, archivo, respuesta, query;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            sellerId = req.body.sellerId;
            archivo = req.file;
            _context9.prev = 2;
            _context9.next = 5;
            return _cloudinary["default"].uploader.upload(archivo.path);

          case 5:
            respuesta = _context9.sent;
            _context9.next = 8;
            return _Seller["default"].findByIdAndUpdate(sellerId, {
              rutaPerfil: respuesta.secure_url,
              titlePerfil: respuesta.public_id
            });

          case 8:
            query = _context9.sent;

            if (!query) {
              _context9.next = 15;
              break;
            }

            _context9.next = 12;
            return _fsExtra["default"].unlink(archivo.path);

          case 12:
            //Elimina ruta del servidor
            res.json({
              message: 'Foto de Vendedor subida con éxito'
            });
            _context9.next = 16;
            break;

          case 15:
            return _context9.abrupt("return", res.status(404).json({
              message: 'Vendedor no encontrado'
            }));

          case 16:
            _context9.next = 22;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](2);
            console.error(_context9.t0);
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

var _default = sellerCtrl;
exports["default"] = _default;
//# sourceMappingURL=seller.controller.js.map