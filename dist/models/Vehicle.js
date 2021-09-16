"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var vehicleSchema = new _mongoose.Schema({
  marca: {
    type: String
  },
  cod_tdp: {
    type: String,
    unique: true
  },
  categoria: {
    type: String
  },
  modelo: {
    type: String
  },
  version: {
    type: String
  },
  userCreator: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Vehicle', vehicleSchema);

exports["default"] = _default;
//# sourceMappingURL=Vehicle.js.map