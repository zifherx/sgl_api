import { Router } from "express";
import authController from '../controllers/auth.controller'
import { authJwt } from "../middlewares"

const router = Router()

router.post('/signin', authController.iniciarSesion)
router.post('/change-password', [authJwt.verifyToken], authController.cambiarContrasena)
router.post('/force-logout', authController.forzarCierreSesion)
router.post('/logout', [authJwt.verifyToken], authController.cerrarSesion)

export default router