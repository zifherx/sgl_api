"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var financiamientoSchema = new _mongoose.Schema({
  name: {
    type: String
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
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Financiamiento', financiamientoSchema);

exports["default"] = _default;
//# sourceMappingURL=Financiamiento.js.map