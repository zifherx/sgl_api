import { Router } from 'express';
import apiController from '../controllers/api.controller';
import bancosRoutes from './banco.routes';
import roleRoutes from './roles.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import leadsRoutes from './lead.routes';
import sellerRoutes from './seller.routes';
import chasisRoutes from './chasis.routes';
import marcaRoutes from './marca.routes';
import modeloRoutes from './modelo.routes';
import vehicleRoutes from './vehicle.routes';
import sucursalRoutes from './sucursal.routes';
import cityRoutes from './city.routes';
import financiamientoRoutes from './financiamiento.routes';
import conversionRoutes from './conversion.routes';
import originRoutes from './originData.routes';
import statusRoutes from './estado.routes';
import rechazoRoutes from './motivoRechazo.routes';
import promRoutes from './prom.routes';

const router = Router();

router.get('/', apiController.getAll);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/leads', leadsRoutes);
router.use('/sellers', sellerRoutes);
router.use('/chasis', chasisRoutes);
router.use('/brands', marcaRoutes);
router.use('/models', modeloRoutes);
router.use('/sucursal', sucursalRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/city', cityRoutes);
router.use('/bancos', bancosRoutes);
router.use('/finances', financiamientoRoutes);
router.use('/shift', conversionRoutes);
router.use('/origin', originRoutes);
router.use('/status', statusRoutes);
router.use('/motivo-rechazo', rechazoRoutes);
router.use('/metrics', promRoutes);

export default router;