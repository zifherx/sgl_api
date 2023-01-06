import { Router } from "express";
import marcaCtrl from '../controllers/marca.controller'
import { authJwt, verifyDuplicate } from "../middlewares";
import upload from '../middlewares/multer';

const router = Router();

//Obtener Marca
router.get('/', marcaCtrl.getAll);

//Obtener Marca Activos
router.get('/activos', marcaCtrl.getMarcaByActivo);

//Obtener Marca por ID
router.get('/:marcaId', marcaCtrl.getMarcaById);

//Crear Marca
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateMarca], upload.single('avatar'), marcaCtrl.createMarca);

//Actualizar Marca
router.patch('/:marcaId', [authJwt.verifyToken, authJwt.isAdmin], upload.single('avatar'), marcaCtrl.updateMarca);

//Eliminar Marca
router.delete('/:marcaId', [authJwt.verifyToken, authJwt.isAdmin], marcaCtrl.deleteMarca);

export default router;