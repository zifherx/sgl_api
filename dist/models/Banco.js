"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var bancoSchema = new _mongoose.Schema({
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
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Banco', bancoSchema);

exports["default"] = _default;
//# sourceMappingURL=Banco.js.map