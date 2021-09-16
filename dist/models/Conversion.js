"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var conversionSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  status: {
    type: Boolean
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Conversion', conversionSchema);

exports["default"] = _default;
//# sourceMappingURL=Conversion.js.map