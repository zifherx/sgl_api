import {Router} from 'express';
import estadoClass from '../controllers/estado.controller';

const router = Router();

//Get All Estados
router.get('/', estadoClass.getAll);

//Get All Estados Activos
router.get('/activos', estadoClass.getActivos);

//Get One Estado
router.get('/:estadoId', estadoClass.getOneById);

//Create Estado
router.post('/', estadoClass.createOne);

//Update Estado by Id
router.patch('/:estadoId', estadoClass.updateOneById);

//Delete Estado by Id
router.delete('/:estadoId', estadoClass.deleteOneById);



export default router;