"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var mongoURI = process.env.MONGO_URI;
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var _default = {
  SECRET: 'API_SGL_AUTONORT',
  // mongoURL: process.env.MONGO_URI_LOCAL
  mongoURL: "mongodb+srv://".concat(mongoUsername, ":").concat(mongoPassword, "@").concat(mongoURI, "?retryWrites=true&w=majority")
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map