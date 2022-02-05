"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _estado = _interopRequireDefault(require("../controllers/estado.controller"));

var router = (0, _express.Router)(); //Get All Estados

router.get('/', _estado["default"].getAll); //Get All Estados Activos

router.get('/activos', _estado["default"].getActivos); //Get One Estado

router.get('/:estadoId', _estado["default"].getOneById); //Create Estado

router.post('/', _estado["default"].createOne); //Update Estado by Id

router.patch('/:estadoId', _estado["default"].updateOneById); //Delete Estado by Id

router["delete"]('/:estadoId', _estado["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=estado.routes.js.map