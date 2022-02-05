"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var originSchema = new _mongoose.Schema({
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

var _default = (0, _mongoose.model)('OriginData', originSchema);

exports["default"] = _default;
//# sourceMappingURL=OriginData.js.map