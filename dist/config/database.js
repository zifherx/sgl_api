"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _index = _interopRequireDefault(require("./index"));

var initializeDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var con, dbName, dbPort;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _mongoose.connect)(_index["default"].mongoURL, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            con = _context.sent;
            dbName = con.connection.name;
            dbPort = con.connection.port;
            console.log('DB', dbName, 'is connected on port', Number(dbPort));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function initializeDB() {
    return _ref.apply(this, arguments);
  };
}();

var _default = initializeDB;
exports["default"] = _default;
//# sourceMappingURL=database.js.map