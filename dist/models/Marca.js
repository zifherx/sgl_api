"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var marcaSchema = new _mongoose.Schema({
  name: {
    type: String
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
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Marca', marcaSchema);

exports["default"] = _default;
//# sourceMappingURL=Marca.js.map