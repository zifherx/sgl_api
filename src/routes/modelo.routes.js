import { Router } from "express";
import * as modeloCtrl from '../controllers/modelo.controller'
import { authJwt, verifyDuplicate } from "../middlewares";
import upload from '../middlewares/multer';

const router = Router();

//Obtener Modelos
router.get('/', modeloCtrl.getModelos);

//Obtener Modelos Activos
router.get('/activos', modeloCtrl.getModeloByActivo);

//Obtener total de modelos
router.get('/count', modeloCtrl.getCountAll);

//Obtener Modelos por ID
router.get('/:modeloId', modeloCtrl.getModeloById);

//Obtener Modelos ByMarca
router.post('/by-marca', modeloCtrl.getModelsByMarca);

//Crear Modelo
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateModelo], upload.single('avatar'), modeloCtrl.createModelo);

//Actualizar Modelo
router.patch('/:modeloId', [authJwt.verifyToken, authJwt.isAdmin], upload.single('avatar'),  modeloCtrl.updateModelo);

//Eliminar Modelo
router.delete('/:modeloId', [authJwt.verifyToken, authJwt.isAdmin], modeloCtrl.deleteModelo);

export default router;