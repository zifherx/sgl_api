import { Router } from 'express';
import rechazoController from '../controllers/motivoRechazo.controller';
import { authJwt, verifyDuplicate} from '../middlewares';

const router = Router();

router.get('/', rechazoController.getAll);
router.get('/activos', rechazoController.getAllActivos);
router.get('/:bancoId', rechazoController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateMotivoRechazo] ,rechazoController.createOne);
router.patch('/:bancoId',[authJwt.verifyToken, authJwt.isAdmin],rechazoController.updateOneById);
router.delete('/:bancoId',[authJwt.verifyToken, authJwt.isAdmin],  rechazoController.deleteOneById);

export default router;