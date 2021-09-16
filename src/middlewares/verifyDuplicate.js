import Role from '../models/Role'
import User from '../models/User'
import Chasis from '../models/Chasis'
import Marca from '../models/Marca'
import Modelo from '../models/Modelo'
import Sucursal from '../models/Sucursal'
import Vehicle from '../models/Vehicle'
import Conversion from '../models/Conversion'

export const checkRoleDuplicate = async(req, res, next) => {
    const { name } = req.body

    const roleFound = await Role.findOne({ name })

    if (roleFound) return res.status(201).json({ message: 'El rol ya existe' })

    next()
}

export const checkUserDuplicate = async(req, res, next) => {
    const { username, email } = req.body

    const userFound1 = await User.findOne({ username })
    const userFound2 = await User.findOne({ email })

    if (userFound1) return res.status(201).json({ message: 'El nombre de usuario ya existe' })

    if (userFound2) return res.status(201).json({ message: 'El email de usuario ya está registrado' })

    next()
}

export const checkDuplicateMarca = async(req, res, next) => {
    const { name } = req.body;
    const encontrado = await Marca.findOne({ name: name });

    if (encontrado) return res.status(201).json({ message: 'La Marca ya existe' });

    next();
}

export const checkDuplicateModelo = async(req, res, next) => {
    const { name } = req.body;
    const modeloEncontrado = await Modelo.findOne({ name: name });

    if (modeloEncontrado) return res.status(201).json({ message: 'El Modelo ya existe' });

    next();
}

export const checkDuplicateChasis = async(req, res, next) => {
    const { name } = req.body;
    const encontrado = await Chasis.findOne({ name: name });

    if (encontrado) return res.status(201).json({ message: 'El Chasis ya existe' });

    next();
}

export const checkDuplicateVehiculo = async(req, res, next) => {
    const { cod_tdp, version } = req.body;

    const encontrado = await Vehicle.findOne({ cod_tdp: cod_tdp });
    const encontrado1 = await Vehicle.findOne({ version: version });

    if (encontrado) return res.status(201).json({ message: 'El COD-TDP ya existe' });
    if (encontrado1) return res.status(201).json({ message: 'El vehículo ya existe' });

    next();
}

export const checkDuplicateSucursal = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await Sucursal.findOne({ name: name });

    if (encontrado) return res.status(201).json({ message: 'La sucursal ya existe' });


    next();
}

export const checkDuplicateConversion = async(req, res, next) => {
    const { name } = req.body;

    const encontrado = await Conversion.findOne({ name: name });

    if (encontrado) return res.status(201).json({ message: 'La Conversion ya existe' });


    next();
}