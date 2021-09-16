import { Router } from "express";
import * as sucursalCtrl from '../controllers/sucursal.controllers'
import { authJwt, verifyDuplicate } from "../middlewares";

const router = Router();

//Obtener Sucursal
router.get('/', sucursalCtrl.getAll);

//Obtener Sucursal Activos
router.get('/activos', sucursalCtrl.getSucursalByActivo);

//Obtener Sucursal por ID
router.get('/:sucursalId', sucursalCtrl.getSucursalById);

//Crear Sucursal
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateSucursal], sucursalCtrl.createSucursal);

//Actualizar Sucursal
router.patch('/:sucursalId', [authJwt.verifyToken, authJwt.isAdmin], sucursalCtrl.updateSucursal);

//Eliminar Sucursal
router.delete('/:sucursalId', [authJwt.verifyToken, authJwt.isAdmin], sucursalCtrl.deleteSucursal);

export default router;