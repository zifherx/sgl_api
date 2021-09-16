"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var userCtrl = {};

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // secure: true

});

userCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].find().sort({
              name: 'asc'
            }).populate('roles userCreator');

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
              message: 'No existen Usuarios'
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

userCtrl.getOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findById(userId).populate('roles userCreator');

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
              message: 'No existe el Usuario'
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

userCtrl.createUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, username, password, email, cellphone, titlePerfil, rutaPerfil, description, roles, userCreator, newUser, userFound, foundRole, rol, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, username = _req$body.username, password = _req$body.password, email = _req$body.email, cellphone = _req$body.cellphone, titlePerfil = _req$body.titlePerfil, rutaPerfil = _req$body.rutaPerfil, description = _req$body.description, roles = _req$body.roles, userCreator = _req$body.userCreator;
            _context3.prev = 1;
            _context3.t0 = _User["default"];
            _context3.t1 = name;
            _context3.t2 = username;
            _context3.next = 7;
            return _User["default"].encryptPassword(password);

          case 7:
            _context3.t3 = _context3.sent;
            _context3.t4 = email;
            _context3.t5 = cellphone;
            _context3.t6 = titlePerfil;
            _context3.t7 = rutaPerfil;
            _context3.t8 = description;
            _context3.t9 = {
              name: _context3.t1,
              username: _context3.t2,
              password: _context3.t3,
              email: _context3.t4,
              cellphone: _context3.t5,
              titlePerfil: _context3.t6,
              rutaPerfil: _context3.t7,
              description: _context3.t8
            };
            newUser = new _context3.t0(_context3.t9);
            _context3.next = 17;
            return _User["default"].find({
              username: userCreator
            });

          case 17:
            userFound = _context3.sent;
            newUser.userCreator = userFound.map(function (a) {
              return a._id;
            });

            if (!roles) {
              _context3.next = 26;
              break;
            }

            _context3.next = 22;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 22:
            foundRole = _context3.sent;
            newUser.roles = foundRole.map(function (b) {
              return b._id;
            });
            _context3.next = 30;
            break;

          case 26:
            _context3.next = 28;
            return _Role["default"].findOne({
              name: 'Usuario'
            });

          case 28:
            rol = _context3.sent;
            newUser.roles = [rol._id];

          case 30:
            _context3.next = 32;
            return newUser.save();

          case 32:
            query = _context3.sent;

            if (query) {
              res.json({
                message: 'Usuario creado con éxito'
              });
            }

            _context3.next = 40;
            break;

          case 36:
            _context3.prev = 36;
            _context3.t10 = _context3["catch"](1);
            console.error(_context3.t10);
            return _context3.abrupt("return", res.status(503).json({
              message: _context3.t10.message
            }));

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 36]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

userCtrl.updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, _req$body2, roles, status, userCreator, roleFound, userFound, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            _req$body2 = req.body, roles = _req$body2.roles, status = _req$body2.status, userCreator = _req$body2.userCreator;
            _context4.prev = 2;
            _context4.next = 5;
            return _Role["default"].find({
              name: roles
            });

          case 5:
            roleFound = _context4.sent;
            _context4.next = 8;
            return _User["default"].find({
              username: userCreator
            });

          case 8:
            userFound = _context4.sent;
            _context4.next = 11;
            return _User["default"].findByIdAndUpdate(userId, {
              roles: roleFound.map(function (a) {
                return a._id;
              }),
              status: status,
              userCreator: userFound.map(function (b) {
                return b._id;
              })
            });

          case 11:
            query = _context4.sent;

            if (!query) {
              _context4.next = 16;
              break;
            }

            res.json({
              message: 'Usuario actualizado con éxito'
            });
            _context4.next = 17;
            break;

          case 16:
            return _context4.abrupt("return", res.status(404).json({
              message: 'Usuario no encontrado'
            }));

          case 17:
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](2);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(503).json({
              message: _context4.t0.message
            }));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 19]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

userCtrl.updateProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body3, userId, email, cellphone, description, data_image, response, query;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, userId = _req$body3.userId, email = _req$body3.email, cellphone = _req$body3.cellphone, description = _req$body3.description;
            data_image = req.file;
            _context5.prev = 2;
            _context5.next = 5;
            return _cloudinary["default"].uploader.upload(data_image.path);

          case 5:
            response = _context5.sent;
            _context5.next = 8;
            return _User["default"].findByIdAndUpdate(userId, {
              email: email,
              cellphone: cellphone,
              description: description,
              rutaPerfil: response.secure_url,
              titlePerfil: response.public_id
            });

          case 8:
            query = _context5.sent;

            if (!query) {
              _context5.next = 15;
              break;
            }

            _context5.next = 12;
            return _fsExtra["default"].unlink(data_image.path);

          case 12:
            //Eliminando ruta del servidor
            res.json({
              message: 'Perfil actualizado con éxito'
            });
            _context5.next = 16;
            break;

          case 15:
            return _context5.abrupt("return", res.status(404).json({
              message: 'Perfil no encontrado'
            }));

          case 16:
            _context5.next = 22;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](2);
            console.error(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              message: _context5.t0.message
            }));

          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 18]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

userCtrl.deleteUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, query;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.params.userId;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findByIdAndRemove(userId);

          case 4:
            query = _context6.sent;

            if (!query) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: 'Usuario eliminado con éxito'
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: 'Usuario no encontrado'
            }));

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.error(_context6.t0);
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

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

userCtrl.getCountAll = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _User["default"].estimatedDocumentCount();

          case 3:
            query = _context7.sent;

            if (query >= 0) {
              res.json({
                nro_users: query
              });
            }

            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0);
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

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

userCtrl.getCountByStatus = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var status, query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            status = req.body.status;
            _context8.prev = 1;
            _context8.next = 4;
            return _User["default"].where({
              status: status
            }).countDocuments();

          case 4:
            query = _context8.sent;

            if (query >= 0) {
              res.json({
                nro_users_status: query
              });
            }

            _context8.next = 12;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](1);
            console.error(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              message: _context8.t0.message
            }));

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 8]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

userCtrl.getCountByOnline = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var online, query;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            online = req.body.online;
            _context9.prev = 1;
            _context9.next = 4;
            return _User["default"].where({
              online: online
            }).countDocuments();

          case 4:
            query = _context9.sent;

            if (query >= 0) {
              res.json({
                nro_users_online: query
              });
            }

            _context9.next = 12;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            console.error(_context9.t0);
            return _context9.abrupt("return", res.status(503).json({
              message: _context9.t0.message
            }));

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 8]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var _default = userCtrl;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map