"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var sellerSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  document: {
    type: String
  },
  cellphone: {
    type: String
  },
  email: {
    type: String
  },
  tipo: {
    type: String
  },
  marca: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Marca'
  },
  sucursal: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Sucursal'
  },
  avatar: {
    type: String,
    "default": 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
  },
  status: {
    type: Boolean,
    "default": true
  },
  createdBy: {
    ref: 'User',
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Seller', sellerSchema);

exports["default"] = _default;
//# sourceMappingURL=Seller.js.map