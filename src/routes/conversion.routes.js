import {Router} from 'express';
import conversionController from '../controllers/conversion.controller';
import { authJwt, verifyDuplicate} from '../middlewares';

const router = new Router();

router.get('/', conversionController.getAll);
router.get('/activos', conversionController.getActivos);
router.get('/:conversionId', conversionController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateConversion] ,conversionController.createOne);
router.patch('/:conversionId', [authJwt.verifyToken, authJwt.isAdmin] , conversionController.updateOneById);
router.delete('/:conversionId', [authJwt.verifyToken, authJwt.isAdmin] , conversionController.deleteOneById);

export default router;