import { Router } from "express";
import leadController from '../controllers/lead.controller'
import { authJwt } from "../middlewares";

const router = Router()

router.get('/', leadController.getAll)
router.get('/nuevos', leadController.getLeadsIngresados)
router.get('/asignados', leadController.getLeadsAsignados)
router.get('/atendidos', leadController.getLeadsAtendidos)
router.get('/count', leadController.getCountAll)
router.post('/origen/count', leadController.conteoLeadsbyOrigen)
router.post('/count/assigned-by-vendedor', leadController.conteoLeadsAsignadosByVendedor)
router.post('/count/attended-by-vendedor', leadController.conteoLeadsAtendidosByVendedor)
router.post('/count/modelo', leadController.conteoLeadsAtendidosxModelo)
router.post('/sale-by-status', leadController.conteoVentasByStatus);
router.post('/count-by-status', leadController.getCountByStatus);
router.get('/:leadId', leadController.getOne)
router.post('/', [authJwt.verifyToken, authJwt.isAsistente_Marketing], leadController.createLead)
router.patch('/update/:leadId', [authJwt.verifyToken, authJwt.isAsistente_Callcenter], leadController.actualizarVenta)
router.patch('/asignar/:leadId', [authJwt.verifyToken, authJwt.isAsistente_Callcenter], leadController.asignarLead)
router.patch('/:leadId', [authJwt.verifyToken, authJwt.isAsistente_Callcenter], leadController.atenderLead)
router.delete('/:leadId', [authJwt.verifyToken, authJwt.isAdmin], leadController.deleteLead)

export default router