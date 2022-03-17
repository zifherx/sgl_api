"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _lead = _interopRequireDefault(require("../controllers/lead.controller"));

var _middlewares = require("../middlewares");

var router = (0, _express.Router)(); // Obtener todos los leads

router.get('/', _lead["default"].getAll); // Obtener un lead por id

router.get('/:leadId', _lead["default"].getOneById); //Leads by Sucursal y rango fechas

router.post('/by-dates', _lead["default"].leadsBySucursalFecha); // Crear lead

router.post('/', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].createOne); // Leads by Fecha y Status Conversion

router.post('/by-modificado', _lead["default"].leadsModificados);
router.post('/by-status', _lead["default"].leadsByStatusFecha);
router.post('/count/by-dates', _lead["default"].countLeadsByDates);
router.post('/conversion/count-by-dates', _lead["default"].countLeadsConversionyDates);
router.post('/ranking/by-dates', _lead["default"].rankingLeadsConversionByDates);
router.post('/ranking/by-origin', _lead["default"].rankingLeadsByOriginDataDateConversion); // Descarte de interesado

router.patch('/update/interested/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isNoInteresado); // Descarte de atencion

router.patch('/update/attended/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isAtendido); // Descarte de asignacion

router.patch('/update/assigned/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isAsignacion); // Descarte de cotizacion

router.patch('/update/quoted/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isCotizado); // Declinar Lead

router.patch('/update/cancelled/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isDeclinado); // Descarte de conversion

router.patch('/update/changed/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isConvertido); // Descarte a Booking

router.patch('/update/booked/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isBooking); // Descarte a Down

router.patch('/update/downed/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isDown); // Descarte a Venta

router.patch('/update/saled/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAsistente_CallCenterAdminDigital], _lead["default"].isVenta); //Eliminar lead por id

router["delete"]('/:leadId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _lead["default"].deleteOneById);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=lead.routes.js.map