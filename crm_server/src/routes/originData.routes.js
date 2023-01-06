import { Router } from "express";
import originController from '../controllers/originData.controller'
import { authJwt, verifyDuplicate } from "../middlewares";

const router = Router();

router.get('/', originController.getAll);
router.get('/activos', originController.getActivos);
router.get('/:originId', originController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkOriginDuplicate], originController.createOne);
router.patch('/:originId', [authJwt.verifyToken, authJwt.isAdmin], originController.updateOneById);
router.delete('/:originId', [authJwt.verifyToken, authJwt.isAdmin], originController.deleteOneById)

export default router;