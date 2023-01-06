import { Router } from 'express'
import roleController from '../controllers/role.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router()

router.get('/', roleController.getAll);
router.get('/activos', roleController.getAllByStatus);
router.get('/count', roleController.countAll);
router.get('/:roleId', roleController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkRoleDuplicate], roleController.createRole);
router.patch('/:roleId', [authJwt.verifyToken, authJwt.isAdmin], roleController.updateRoleById);
router.delete('/:roleId', [authJwt.verifyToken, authJwt.isAdmin], roleController.deleteRoleById);

export default router;