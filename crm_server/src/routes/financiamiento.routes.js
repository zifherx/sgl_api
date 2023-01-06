import  {Router} from 'express';
import financesController from '../controllers/financiamiento.controller';
import {authJwt, verifyDuplicate} from '../middlewares';

const router = Router();

// Obtener todos los financiamientos
router.get('/', financesController.getAll);

// Obtener financiamientos activos
router.get('/activos', financesController.getActivos);

// Obtener un financiamiento
router.get('/:financesId', financesController.getOneById);

//Crear un nuevo financiamiento
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateFinances] ,financesController.createOne);

//Actualizar financiamiento
router.patch('/:financesId', [authJwt.verifyToken, authJwt.isAdmin] , financesController.updateOneById);

//Eliminar financiamiento
router.delete('/:financesId' , [authJwt.verifyToken, authJwt.isAdmin], financesController.deleteOneById);

export default router;