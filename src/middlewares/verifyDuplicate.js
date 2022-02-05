import Role from '../models/Role'
import User from '../models/User'
import Seller from '../models/Seller'
import Chasis from '../models/Chasis'
import Marca from '../models/Marca'
import Modelo from '../models/Modelo'
import Sucursal from '../models/Sucursal'
import Vehicle from '../models/Vehicle'
import City from '../models/City'
import Financiamiento from '../models/Financiamiento'
import EstadoConversion from '../models/EstadoConversion';
import OriginData from '../models/OriginData';

export const checkRoleDuplicate = async(req, res, next) => {
    const { name } = req.body

    const roleFound = await Role.findOne({ name })

    if (roleFound) return res.status(500).json({ message: 'El rol ya existe' })

    next()
}

export const checkUserDuplicate = async(req, res, next) => {
    const { username } = req.body

    const userFound = await User.findOne({ username });

    if (userFound) return res.status(500).json({ message: 'El nombre de usuario ya existe' })

    next()
}

export const checkDuplicateMarca = async(req, res, next) => {
    const { name } = req.body;
    const encontrado = await Marca.findOne({ name: name });

    if (encontrado) return res.status(500).json({ message: 'La Marca ya existe' });

    next();
}

export const checkDuplicateModelo = async(req, res, next) => {
    const { name } = req.body;
    const modeloEncontrado = await Modelo.findOne({ name: name });

    if (modeloEncontrado) return res.status(500).json({ message: 'El Modelo ya existe' });

    next();
}

export const checkDuplicateBanco = async(req, res, next) => {
    const { name } = req.body;
    const encontrado = await Chasis.findOne({ name });

    if (encontrado) return res.status(500).json({ message: 'Entidad Bancaria ya existe' });

    next();
}

export const checkDuplicateChasis = async(req, res, next) => {
    const { name } = req.body;
    const encontrado = await Chasis.findOne({ name: name });

    if (encontrado) return res.status(500).json({ message: 'El Chasis ya existe' });

    next();
}

export const checkDuplicateVehiculo = async(req, res, next) => {
    const { cod_tdp, version } = req.body;

    const encontrado = await Vehicle.findOne({ cod_tdp: cod_tdp });
    const encontrado1 = await Vehicle.findOne({ version: version });

    if (encontrado) return res.status(500).json({ message: 'El COD-TDP ya existe' });
    if (encontrado1) return res.status(500).json({ message: 'El vehículo ya existe' });

    next();
}

export const checkDuplicateSucursal = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await Sucursal.findOne({ name: name });

    if (encontrado) return res.status(500).json({ message: 'La sucursal ya existe' });


    next();
}

export const checkSellerDuplicate = async(req, res, next) => {
    const { name, document } = req.body;

    const nameFounded = await Seller.findOne({ name: name });
    const documentFounded = await Seller.findOne({ document: document });

    if (nameFounded) return res.status(500).json({ message: 'El Vendedor ya existe' });
    if (documentFounded) return res.status(500).json({ message: 'El documento del Vendedor ya existe' });
    next();
}

export const checkDuplicateCity = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await City.findOne({ name: name });
    if (encontrado) return res.status(500).json({ message: 'La ciudad ya existe' });
    next();
}

export const checkDuplicateFinances = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await Financiamiento.findOne({ name: name });
    if (encontrado) return res.status(500).json({ message: 'El tipo de financiamiento ya existe' });
    next();
}

export const checkDuplicateConversion = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await EstadoConversion.findOne({ name: name });
    if (encontrado) return res.status(500).json({ message: 'El estado ya existe' });
    next();
}

export const checkOriginDuplicate = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await OriginData.findOne({ name: name });
    if (encontrado) return res.status(500).json({ message: 'El origen ya existe' });
    next();
}