import { Router } from "express";
import * as modeloCtrl from '../controllers/modelo.controller'
import { authJwt, verifyDuplicate } from "../middlewares";

const router = Router();

//Obtener Modelos
router.get('/', modeloCtrl.getModelos);

//Obtener Modelos Activos
router.get('/activos', modeloCtrl.getModeloByActivo);

//Obtener Modelos por ID
router.get('/:modeloId', modeloCtrl.getModeloById);

//Crear Modelo
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateModelo], modeloCtrl.createModelo);

//Actualizar Modelo
router.patch('/:modeloId', [authJwt.verifyToken, authJwt.isAdmin], modeloCtrl.updateModelo);

//Eliminar Modelo
router.delete('/:modeloId', [authJwt.verifyToken, authJwt.isAdmin], modeloCtrl.deleteModelo);

export default router;