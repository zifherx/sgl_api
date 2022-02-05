import { Router } from 'express'
import vehicleController from '../controllers/vehicle.controller'
import { authJwt, verifyDuplicate } from '../middlewares'

const router = Router();

//Obtener Vehiculos
router.get('/', vehicleController.getVehicles);

//Obtener Total Vehiculos
router.get('/count', vehicleController.getCountAll);

//Obtener Vehiculo por ID
router.get('/:vehicleId', vehicleController.getVehicleById);

//Obtener Vehiculo por Marca
router.post('/by-marca', vehicleController.getVehiculeByMarca);

//Obtener Vehiculo por Modelo
router.post('/by-modelo', vehicleController.getVehiculeByModelo);

//Obtener Vehiculo por COD-TDP
router.post('/find', vehicleController.getVehicleByCodigo);

//Crear Vehiculo
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkDuplicateVehiculo], vehicleController.createVehicle);

//Actualizar Vehiculo
router.patch('/:vehicleId', [authJwt.verifyToken, authJwt.isAdmin], vehicleController.updateVehicleById);

//Eliminar Vehiculo
router.delete('/:vehicleId', [authJwt.verifyToken, authJwt.isAdmin], vehicleController.deleteVehicleById);

export default router;