import { Router } from 'express'
import roleController from '../controllers/role.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router()

router.get('/', roleController.getAll)
router.get('/count', roleController.getCount)
router.get('/:roleId', roleController.getOne)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkRoleDuplicate], roleController.createRole)
router.patch('/:roleId', [authJwt.verifyToken, authJwt.isAdmin], roleController.updateRole)
router.delete('/:roleId', [authJwt.verifyToken, authJwt.isAdmin], roleController.deleteRole)

export default router;