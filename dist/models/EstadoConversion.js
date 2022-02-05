"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var estadoConversionSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  },
  status: {
    type: Boolean,
    "default": true
  },
  createdBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('EstadoConversion', estadoConversionSchema);

exports["default"] = _default;
//# sourceMappingURL=EstadoConversion.js.map