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

var _Sucursal = _interopRequireDefault(require("../models/Sucursal"));

var userCtrl = {};

userCtrl.getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].find().select("-password").sort({
              name: 1
            }).populate({
              path: "roles",
              select: "name"
            }).populate({
              path: 'sucursal',
              select: 'name'
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
              total_count: query.length,
              all_users: query
            });
            _context.next = 9;
            break;

          case 8:
            return _context.abrupt("return", res.status(404).json({
              message: "No existen Usuarios"
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

userCtrl.getOneById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findById(userId).select("-password").populate({
              path: "roles",
              select: "name"
            }).populate({
              path: 'sucursal',
              select: 'name'
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
              founded: query
            });
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res.status(404).json({
              message: "No existe el Usuario"
            }));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(503).json({
              error: _context2.t0.message
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
    var _req$body, name, username, password, sucursal, roles, createdBy, newUser, userFound, sucursalFound, foundRole, rol, query;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, username = _req$body.username, password = _req$body.password, sucursal = _req$body.sucursal, roles = _req$body.roles, createdBy = _req$body.createdBy;
            _context3.prev = 1;
            _context3.t0 = _User["default"];
            _context3.t1 = name;
            _context3.t2 = username;
            _context3.next = 7;
            return _User["default"].encryptPassword(password);

          case 7:
            _context3.t3 = _context3.sent;
            _context3.t4 = {
              name: _context3.t1,
              username: _context3.t2,
              password: _context3.t3
            };
            newUser = new _context3.t0(_context3.t4);
            _context3.next = 12;
            return _User["default"].findOne({
              username: createdBy
            });

          case 12:
            userFound = _context3.sent;
            newUser.createdBy = userFound._id;
            _context3.next = 16;
            return _Sucursal["default"].findOne({
              name: sucursal
            });

          case 16:
            sucursalFound = _context3.sent;
            newUser.sucursal = sucursalFound._id;

            if (!roles) {
              _context3.next = 25;
              break;
            }

            _context3.next = 21;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 21:
            foundRole = _context3.sent;
            newUser.roles = foundRole.map(function (b) {
              return b._id;
            });
            _context3.next = 29;
            break;

          case 25:
            _context3.next = 27;
            return _Role["default"].findOne({
              name: "Usuario"
            });

          case 27:
            rol = _context3.sent;
            newUser.roles = [rol._id];

          case 29:
            _context3.next = 31;
            return newUser.save();

          case 31:
            query = _context3.sent;

            if (query) {
              res.json({
                message: "Usuario creado con éxito"
              });
            }

            _context3.next = 39;
            break;

          case 35:
            _context3.prev = 35;
            _context3.t5 = _context3["catch"](1);
            console.log(_context3.t5);
            return _context3.abrupt("return", res.status(503).json({
              error: _context3.t5.message
            }));

          case 39:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 35]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

userCtrl.updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, _req$body2, name, username, roles, email, cellphone, sucursal, status, roleFound, sucursalFound, query;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            _req$body2 = req.body, name = _req$body2.name, username = _req$body2.username, roles = _req$body2.roles, email = _req$body2.email, cellphone = _req$body2.cellphone, sucursal = _req$body2.sucursal, status = _req$body2.status;
            _context4.prev = 2;
            _context4.next = 5;
            return _Role["default"].findOne({
              name: roles
            });

          case 5:
            roleFound = _context4.sent;
            _context4.next = 8;
            return _Sucursal["default"].findOne({
              name: sucursal
            });

          case 8:
            sucursalFound = _context4.sent;

            if (sucursalFound) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Sucursal ".concat(sucursal, " no encontrada")
            }));

          case 11:
            if (roleFound) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "No existe el rol ".concat(roles)
            }));

          case 13:
            _context4.next = 15;
            return _User["default"].findByIdAndUpdate(userId, {
              name: name,
              username: username,
              email: email,
              cellphone: cellphone,
              sucursal: sucursalFound._id,
              roles: roleFound._id,
              status: status
            });

          case 15:
            query = _context4.sent;

            if (!query) {
              _context4.next = 20;
              break;
            }

            res.json({
              message: "Usuario actualizado con éxito"
            });
            _context4.next = 21;
            break;

          case 20:
            return _context4.abrupt("return", res.status(404).json({
              message: "Usuario no encontrado"
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

userCtrl.updateProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userId, _req$body3, email, cellphone, description, avatar, query;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = req.params.userId;
            _req$body3 = req.body, email = _req$body3.email, cellphone = _req$body3.cellphone, description = _req$body3.description;
            avatar = req.file;
            query = null;
            _context5.prev = 4;

            if (!(avatar == null || avatar == undefined)) {
              _context5.next = 11;
              break;
            }

            _context5.next = 8;
            return _User["default"].findByIdAndUpdate(userId, {
              email: email,
              cellphone: cellphone,
              description: description
            });

          case 8:
            query = _context5.sent;
            _context5.next = 14;
            break;

          case 11:
            _context5.next = 13;
            return _User["default"].findByIdAndUpdate(userId, {
              email: email,
              cellphone: cellphone,
              description: description,
              avatar: avatar.location
            });

          case 13:
            query = _context5.sent;

          case 14:
            if (!query) {
              _context5.next = 18;
              break;
            }

            res.json({
              message: "Perfil actualizado con éxito"
            });
            _context5.next = 19;
            break;

          case 18:
            return _context5.abrupt("return", res.status(404).json({
              message: "Perfil no encontrado"
            }));

          case 19:
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](4);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(503).json({
              error: _context5.t0.message
            }));

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 21]]);
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
            return _User["default"].findByIdAndDelete(userId);

          case 4:
            query = _context6.sent;

            if (!query) {
              _context6.next = 9;
              break;
            }

            res.json({
              message: "Usuario eliminado con éxito"
            });
            _context6.next = 10;
            break;

          case 9:
            return _context6.abrupt("return", res.status(404).json({
              message: "Usuario no encontrado"
            }));

          case 10:
            _context6.next = 16;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(503).json({
              error: _context6.t0.message
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
            return _User["default"].countDocuments();

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
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(503).json({
              error: _context7.t0.message
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

userCtrl.getAllByStatus = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var query;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _User["default"].find({
              status: true
            }).select("-password").sort({
              name: 1
            }).populate({
              path: "roles",
              select: "name"
            }).populate({
              path: "createdBy",
              select: "name username"
            });

          case 3:
            query = _context8.sent;

            if (!(query.length > 0)) {
              _context8.next = 8;
              break;
            }

            res.json({
              count_activos: query.length,
              users_activos: query
            });
            _context8.next = 9;
            break;

          case 8:
            return _context8.abrupt("return", res.status(404).json({
              message: 'No existen usuarios activos'
            }));

          case 9:
            _context8.next = 15;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(503).json({
              error: _context8.t0.message
            }));

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 11]]);
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
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(503).json({
              error: _context9.t0.message
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

userCtrl.uploadPhoto = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var userId, avatar, query;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userId = req.params.userId;
            avatar = req.file;
            query = null;
            _context10.prev = 3;

            if (!(avatar == null || avatar == undefined)) {
              _context10.next = 8;
              break;
            }

            return _context10.abrupt("return", res.status(404).json({
              message: 'No se ha cargado avatar'
            }));

          case 8:
            _context10.next = 10;
            return _User["default"].findByIdAndUpdate(userId, {
              avatar: avatar.location
            });

          case 10:
            query = _context10.sent;

          case 11:
            if (!query) {
              _context10.next = 15;
              break;
            }

            res.json({
              message: "Avatar subido con éxito"
            });
            _context10.next = 16;
            break;

          case 15:
            return _context10.abrupt("return", res.status(404).json({
              message: "Perfil no encontrado"
            }));

          case 16:
            _context10.next = 22;
            break;

          case 18:
            _context10.prev = 18;
            _context10.t0 = _context10["catch"](3);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(503).json({
              error: _context10.t0.message
            }));

          case 22:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[3, 18]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

var _default = userCtrl;
exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map