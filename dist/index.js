"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _app = _interopRequireDefault(require("./app"));

var _database = _interopRequireDefault(require("./config/database"));

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _app["default"].listen(_app["default"].get('port'));

          case 2:
            console.log('Server on port', _app["default"].get('port'));
            _context.next = 5;
            return (0, _database["default"])();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main();
//# sourceMappingURL=index.js.map