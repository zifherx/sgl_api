import { Router } from "express";
import leadController from '../controllers/lead.controller'
import { authJwt } from "../middlewares";

const router = Router()

// Obtener todos los leads
router.get('/', leadController.getAll);

// Obtener un lead por id
router.get('/:leadId', leadController.getOneById);

//Leads by Sucursal y rango fechas
router.post('/by-dates', leadController.leadsBySucursalFecha);

// Crear lead
router.post('/', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.createOne);

// Leads by Fecha y Status Conversion
router.post('/by-modificado', leadController.leadsModificados);
router.post('/by-status', leadController.leadsByStatusFecha);
router.post('/by-marca', leadController.getLeadsByMarcaFecha);//Nueva Ruta
router.post('/count/by-dates', leadController.countLeadsByDates);
router.post('/conversion/count-by-dates', leadController.countLeadsConversionyDates);
router.post('/ranking/by-dates', leadController.rankingLeadsConversionByDates);
router.post('/ranking/by-origin', leadController.rankingLeadsByOriginDataDateConversion);

// Descarte de interesado
router.patch('/update/interested/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isNoInteresado);

// Descarte de atencion
router.patch('/update/attended/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isAtendido);

// Descarte de asignacion
router.patch('/update/assigned/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isAsignacion);

// Descarte de cotizacion
router.patch('/update/quoted/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isCotizado);

// Declinar Lead
router.patch('/update/cancelled/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isDeclinado);

// Descarte de conversion
router.patch('/update/changed/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isConvertido);

// Descarte a Booking
router.patch('/update/booked/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isBooking);

// Descarte a Down
router.patch('/update/downed/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isDown);

// Descarte a Venta
router.patch('/update/saled/:leadId', [authJwt.verifyToken, authJwt.isAsistente_CallCenterAdminDigital], leadController.isVenta);

//Eliminar lead por id
router.delete('/:leadId', [authJwt.verifyToken, authJwt.isAdmin], leadController.deleteOneById)

export default router