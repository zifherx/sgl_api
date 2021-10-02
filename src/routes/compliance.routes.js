import { Router } from 'express'
import complianceController from '../controllers/compliance.controller'
import { authJwt } from '../middlewares'

const router = Router();

//Obtener Todos los cumplimientos
router.get('/', complianceController.getAll);

//Contador de Registros
router.get('/count/all', complianceController.getCountAll)

//Obtener Cumplimiento por ID
router.get('/:complianceId', complianceController.getOne);

//Eliminar Cumplimiento por ID
router.delete('/:complianceId', complianceController.eliminarCumpimiento);

//Creando cumplimiento
router.post('/', complianceController.createCumplimiento)

//Obtener Cumplimientos del Asesor
router.post('/goals/by-asesor', complianceController.getByAsesor)

//Obtener registros por Sede y Fecha
router.post('/goals/by-sucursal', complianceController.getCumplimientosxFecha)

export default router;