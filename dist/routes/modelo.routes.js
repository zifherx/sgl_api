"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var modeloCtrl = _interopRequireWildcard(require("../controllers/modelo.controller"));

var _middlewares = require("../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); //Obtener Modelos

router.get('/', modeloCtrl.getModelos); //Obtener Modelos Activos

router.get('/activos', modeloCtrl.getModeloByActivo); //Obtener Modelos por ID

router.get('/:modeloId', modeloCtrl.getModeloById); //Crear Modelo

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin, _middlewares.verifyDuplicate.checkDuplicateModelo], modeloCtrl.createModelo); //Actualizar Modelo

router.patch('/:modeloId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], modeloCtrl.updateModelo); //Eliminar Modelo

router["delete"]('/:modeloId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], modeloCtrl.deleteModelo);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=modelo.routes.js.map