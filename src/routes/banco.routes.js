import { Router } from 'express';
import bancoController from '../controllers/banco.controller';
import { authJwt, verifyDuplicate} from '../middlewares';
import upload from '../middlewares/multer';

const router = Router();

router.get('/', bancoController.getAll);
router.get('/activos', bancoController.getAllByStatus);
router.get('/:bancoId', bancoController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateBanco] , upload.single('avatar') ,bancoController.createOne);
router.patch('/:bancoId',[authJwt.verifyToken, authJwt.isAdmin],  upload.single('avatar'),bancoController.updateOneById);
router.delete('/:bancoId',[authJwt.verifyToken, authJwt.isAdmin],  bancoController.deleteOneById);

export default router;