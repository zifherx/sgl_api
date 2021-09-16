import { Router } from "express";
import * as marcaCtrl from '../controllers/marca.controller'
import { authJwt, verifyDuplicate } from "../middlewares";

const router = Router();

//Obtener Marca
router.get('/', marcaCtrl.getAll);

//Obtener Marca Activos
router.get('/activos', marcaCtrl.getMarcaByActivo);

//Obtener Marca por ID
router.get('/:marcaId', marcaCtrl.getMarcaById);

//Crear Marca
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateMarca], marcaCtrl.createMarca);

//Actualizar Marca
router.patch('/:marcaId', [authJwt.verifyToken, authJwt.isAdmin], marcaCtrl.updateMarca);

//Eliminar Marca
router.delete('/:marcaId', [authJwt.verifyToken, authJwt.isAdmin], marcaCtrl.deleteMarca);

export default router;