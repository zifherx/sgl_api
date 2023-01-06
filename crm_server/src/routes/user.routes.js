import { Router } from 'express'
import userController from '../controllers/user.controller'
import { authJwt, verifyDuplicate } from '../middlewares'
import upload from '../middlewares/multer'

const router = Router()

router.get('/', userController.getAll);
router.get('/activos', userController.getAllByStatus)
router.get('/count', userController.getCountAll);
router.get('/:userId', userController.getOneById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkUserDuplicate], userController.createUser)
router.post('/count/online', userController.getCountByOnline)
router.patch('/profile/:userId', [authJwt.verifyToken], upload.single('avatar'), userController.updateProfile)
router.patch('/upload/:userId', [authJwt.verifyToken, authJwt.isAdmin], upload.single('avatar'), userController.uploadPhoto)
router.patch('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser)

export default router;