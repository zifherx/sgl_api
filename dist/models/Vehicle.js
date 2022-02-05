"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var vehicleSchema = new _mongoose.Schema({
  chasis: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chasis'
  },
  model: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Modelo'
  },
  cod_tdp: {
    type: String,
    unique: true
  },
  version: {
    type: String
  },
  createdBy: {
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