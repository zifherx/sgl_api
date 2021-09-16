"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var modeloSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  status: {
    type: Boolean
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Modelo', modeloSchema);

exports["default"] = _default;
//# sourceMappingURL=Modelo.js.map