"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = exports.createAdminUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var createRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var nroRoles, registros;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Role["default"].countDocuments();

          case 3:
            nroRoles = _context.sent;

            if (!(nroRoles > 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return Promise.all([new _Role["default"]({
              name: 'Administrador',
              description: 'Webmaster de Sistema'
            }).save(), new _Role["default"]({
              name: 'Usuario',
              description: 'Usuario común'
            }).save(), new _Role["default"]({
              name: 'Asistente-Marketing',
              description: 'Alimenta la base de datos'
            }).save(), new _Role["default"]({
              name: 'Asistente-Digital',
              description: 'Gestiona leads para su conversión'
            }).save()]);

          case 8:
            registros = _context.sent;
            console.log('Roles creados:', registros);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdminUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var nroUser, roleAdmin, registro;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].countDocuments();

          case 3:
            nroUser = _context2.sent;

            if (!(nroUser > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return");

          case 6:
            _context2.next = 8;
            return _Role["default"].findOne({
              name: 'Administrador'
            });

          case 8:
            roleAdmin = _context2.sent;
            _context2.t0 = Promise;
            _context2.t1 = _User["default"];
            _context2.next = 13;
            return _User["default"].encryptPassword('admin');

          case 13:
            _context2.t2 = _context2.sent;
            _context2.t3 = roleAdmin._id;
            _context2.t4 = {
              name: 'Fernando Rojas',
              username: 'frojasq',
              password: _context2.t2,
              email: 'frojas@autonortnor.com.pe',
              description: 'Webmaster del Sistema',
              sucursal: 'Corporativo',
              roles: _context2.t3
            };
            _context2.t5 = new _context2.t1(_context2.t4).save();
            _context2.t6 = [_context2.t5];
            _context2.next = 20;
            return _context2.t0.all.call(_context2.t0, _context2.t6);

          case 20:
            registro = _context2.sent;
            console.log('Usuario creado:', registro);
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t7 = _context2["catch"](0);
            console.error(_context2.t7);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 24]]);
  }));

  return function createAdminUser() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdminUser = createAdminUser;
//# sourceMappingURL=initialSetup.js.map