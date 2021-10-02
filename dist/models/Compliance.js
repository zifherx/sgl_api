"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var complianceSchema = new _mongoose.Schema({
  asesor_venta: {
    ref: 'Seller',
    type: _mongoose.Schema.Types.ObjectId,
    "default": null
  },
  nro_asignados: {
    type: Number,
    min: 0,
    "default": 0
  },
  nro_atendidos: {
    type: Number,
    min: 0,
    "default": 0
  },
  nro_vendidos: {
    type: Number,
    min: 0,
    "default": 0
  },
  meta_asignados: {
    type: Number,
    min: 0,
    "default": 0
  },
  meta_atendidos: {
    type: Number,
    min: 0,
    "default": 0
  },
  meta_vendidos: {
    type: Number,
    min: 0,
    "default": 0
  },
  sucursal: {
    type: String,
    uppercase: true,
    trim: true
  },
  fecha: {
    type: Date,
    "default": Date.now
  },
  anio: {
    type: Number,
    min: 2020
  },
  mes: {
    type: Number,
    min: 1,
    max: 12
  },
  userCreator: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Compliance', complianceSchema);

exports["default"] = _default;
//# sourceMappingURL=Compliance.js.map