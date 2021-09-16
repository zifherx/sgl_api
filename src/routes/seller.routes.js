import { Router } from "express";
import sellerCtrl from '../controllers/seller.controller'
import { authJwt } from "../middlewares";

const router = Router()

router.get('/', sellerCtrl.getAll)
router.get('/activos', sellerCtrl.getSellersByActive)
router.get('/count', sellerCtrl.getCountAll)
router.get('/:sellerId', sellerCtrl.getOne)
router.post('/by-sucursal', [authJwt.verifyToken], sellerCtrl.getSellersBySucursal)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], sellerCtrl.createSeller)
router.patch('/:sellerId', [authJwt.verifyToken, authJwt.isAdmin], sellerCtrl.updateSeller)
router.delete('/:sellerId', [authJwt.verifyToken, authJwt.isAdmin], sellerCtrl.deleteSeller)

export default router