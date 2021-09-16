import { Router } from 'express'
import vehicleCtrl from '../controllers/vehicle.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router();

//Obtener Vehiculos
router.get('/', vehicleCtrl.getVehicles);

//Obtener Vehiculo por ID
router.get('/:vehicleId', vehicleCtrl.getVehicleById);

//Obtener Vehiculo por Marca
router.post('/marca', [authJwt.verifyToken], vehicleCtrl.getVehiculeByMarca);

//Obtener Vehiculo por Modelo
router.post('/modelo', [authJwt.verifyToken], vehicleCtrl.getVehiculeByModelo);

//Crear Vehiculo
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateVehiculo], vehicleCtrl.createVehicle);

//Obtener Vehiculo por COD-TDP
router.post('/find', [authJwt.verifyToken, authJwt.isAdmin], vehicleCtrl.getVehicleByCodigo);

//Actualizar Vehiculo
router.patch('/:vehicleId', [authJwt.verifyToken, authJwt.isAdmin], vehicleCtrl.updateVehicleById);

//Eliminar Vehiculo
router.delete('/:vehicleId', [authJwt.verifyToken, authJwt.isAdmin], vehicleCtrl.deleteVehicleById);

export default router;