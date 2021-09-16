import { Router } from "express";
import customerController from '../controllers/customer.controller'
import { authJwt } from "../middlewares";

const router = Router()

router.get('/', customerController.getAll)
router.get('/count', customerController.getCountAll)
router.get('/:customerId', customerController.getOne)
router.post('/', [authJwt.verifyToken], customerController.createCustomer)
router.patch('/:customerId', [authJwt.verifyToken], customerController.updateCustomer)
router.delete('/:customerId', [authJwt.verifyToken], customerController.deleteCustomer)

export default router