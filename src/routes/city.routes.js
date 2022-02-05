import { Router } from 'express'
import cityCtrl from '../controllers/city.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router();

//Obtener Ciudad
router.get('/', cityCtrl.getAll);

//Obtener Ciudad Activos
router.get('/activos', cityCtrl.getCityByActivo);

//Obtener Ciudad por ID
router.get('/:cityId', cityCtrl.getCityById);

//Crear Ciudad
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateCity], cityCtrl.createCity);

//Actualizar Ciudad
router.patch('/:cityId', [authJwt.verifyToken, authJwt.isAdmin], cityCtrl.updateCity);

//Eliminar Ciudad
router.delete('/:cityId', [authJwt.verifyToken, authJwt.isAdmin], cityCtrl.deleteCity);

export default router;