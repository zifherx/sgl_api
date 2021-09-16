import { Router } from 'express'
import apiController from '../controllers/api.controller'
import roleRoutes from './roles.routes'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import customerRoutes from './customer.routes'
import leadsRoutes from './lead.routes'
import sellerRoutes from './seller.routes'
import chasisRoutes from './chasis.routes'
import marcaRoutes from './marca.routes'
import modeloRoutes from './modelo.routes'
import vehicleRoutes from './vehicle.routes'
import sucursalRoutes from './sucursal.routes'
import conversionRoutes from './conversion.routes'

const router = Router();

router.get('/', apiController.getAll)
router.use('/roles', roleRoutes)
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/customers', customerRoutes)
router.use('/leads', leadsRoutes)
router.use('/sellers', sellerRoutes)
router.use('/chasis', chasisRoutes)
router.use('/brands', marcaRoutes)
router.use('/models', modeloRoutes)
router.use('/sucursal', sucursalRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/conversion', conversionRoutes)

export default router;