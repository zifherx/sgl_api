import { Router } from 'express'
import * as conversionCtrl from '../controllers/conversion.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router();

//Obtener Conversion
router.get('/', conversionCtrl.getAll);

//Obtener Conversion Activos
router.get('/activos', conversionCtrl.getConversionByActivo);

//Obtener Conversion por ID
router.get('/:conversionId', conversionCtrl.getConversionById);

//Crear Conversion
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateConversion], conversionCtrl.createConversion);

//Actualizar Conversion
router.patch('/:conversionId', [authJwt.verifyToken, authJwt.isAdmin], conversionCtrl.updateConversion);

//Eliminar Conversion
router.delete('/:conversionId', [authJwt.verifyToken, authJwt.isAdmin], conversionCtrl.deleteConversion);

export default router;