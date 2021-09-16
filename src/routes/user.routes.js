import { Router } from 'express'
import userController from '../controllers/user.controller'
import { authJwt, verifyDuplicate } from '../middlewares'
import upload from '../middlewares/multer'

const router = Router()

router.get('/', userController.getAll)
router.get('/count', userController.getCountAll)
router.get('/:userId', userController.getOne)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkUserDuplicate], userController.createUser)
router.post('/count-status', userController.getCountByStatus)
router.post('/count-online', userController.getCountByOnline)
router.patch('/update-profile', upload.single('image'), [authJwt.verifyToken], userController.updateProfile)
router.patch('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser)

export default router;