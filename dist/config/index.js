"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  SECRET: 'API_SGL_AUTONORT',
  // mongoURL: process.env.MONGO_URI_LOCAL
  mongoURL: process.env.MONGO_URI_ONLINE
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map