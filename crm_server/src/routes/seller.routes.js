import { Router } from "express";
import sellerCtrl from '../controllers/seller.controller'
import { authJwt, verifyDuplicate } from "../middlewares";
import upload from '../middlewares/multer'

const router = Router();

router.get('/', sellerCtrl.getAll);
router.get('/activos', sellerCtrl.getSellersByActive);
router.get('/count', sellerCtrl.getCountAll);
router.get('/:sellerId', sellerCtrl.getOne);
router.post('/by-sucursal', sellerCtrl.getSellersBySucursal);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifyDuplicate.checkSellerDuplicate], upload.single('avatar'), sellerCtrl.createSeller);
router.patch('/:sellerId', [authJwt.verifyToken, authJwt.isAdmin], sellerCtrl.updateSeller);
router.patch('/upload/:sellerId', [authJwt.verifyToken, authJwt.isAdmin], upload.single('avatar') ,sellerCtrl.updatePhoto);
router.delete('/:sellerId', [authJwt.verifyToken, authJwt.isAdmin], sellerCtrl.deleteSeller);

export default router