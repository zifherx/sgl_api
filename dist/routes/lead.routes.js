"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _lead = _interopRequireDefault(require("../controllers/lead.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.get('/', _lead["default"].getAll);
router.get('/nuevos', _lead["default"].getLeadsIngresados);
router.get('/asignados', _lead["default"].getLeadsAsignados);
router.get('/atendidos', _lead["default"].getLeadsAtendidos);
router.get('/count', _lead["default"].getCountAll);
router.post('/origen/count', _lead["default"].conteoLeadsbyOrigen);
router.post('/count/assigned-by-vendedor', _lead["default"].conteoLeadsAsignadosByVendedor);
router.post('/count/attended-by-vendedor', _lead["default"].conteoLeadsAtendidosByVendedor);
router.post('/count/modelo', _lead["default"].conteoLeadsAtendidosxModelo);
router.post('/sale-by-status', _lead["default"].conteoVentasByStatus);
router.post('/count-by-status', _lead["default"].getCountByStatus);
router.get('/:leadId', _lead["default"].getOne);
router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isMarketingyCallCenter], _lead["default"].createLead);
router.patch('/update/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_Callcenter], _lead["default"].actualizarVenta);
router.patch('/asignar/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_Callcenter], _lead["default"].asignarLead);
router.patch('/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_Callcenter], _lead["default"].atenderLead);
router["delete"]('/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _lead["default"].deleteLead);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=lead.routes.js.map