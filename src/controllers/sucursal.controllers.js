import Sucursal from '../models/Sucursal'
import User from '../models/User';

export const getAll = async(req, res) => {
    try {
        const query = await Sucursal.find()
            .sort({ name: 'asc' })
            .populate({
                path: 'createdBy',
                select: 'name username',
            });
        if (query.length > 0) {
            res.json({total_sucursals: query.length, all_sucursals: query});
        } else {
            return res.status(404).json({ message: 'No existen Sucursales' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const getSucursalById = async(req, res) => {
    const { sucursalId } = req.params
    try {
        const query = await Sucursal.findById(sucursalId)
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query) {
            res.json({sucursal: query});
        } else {
            return res.status(404).json({ message: 'No existe Sucursal' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const getSucursalByActivo = async(req, res) => {
    try {
        const query = await Sucursal.find({ status: true })
            .sort({ name: 'asc' })
            .populate({
                path: 'createdBy',
                select: 'name username',
            });
        if (query.length > 0) {
            res.json({total_actives: query.length, active_sucursals: query});
        } else {
            return res.status(404).json({ message: 'No existen Sucursales Activos' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const createSucursal = async(req, res) => {
    const { name, status, createdBy } = req.body;
    try {
        
        const userFound = await User.findOne({username: createdBy});
        if(!userFound) return res.status(404).json({message: `Colaborador ${createdBy} no encontrado`});

        const obj = new Sucursal({ name, status });
        obj.createdBy = userFound._id;

        const query = await obj.save()
        if (query) {
            res.json({ message: 'Sucursal creada con éxito' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const updateSucursal = async(req, res) => {
    const { sucursalId } = req.params;
    const { name, status } = req.body;
    try {
        const query = await Sucursal.findByIdAndUpdate(sucursalId, { name, status });
        if (query) {
            res.json({ message: 'Sucursal actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Sucursal a actualizar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const deleteSucursal = async(req, res) => {
    const { sucursalId } = req.params;
    try {
        const query = await Sucursal.findByIdAndDelete(sucursalId);
        if (query) {
            res.json({ message: 'Sucursal eliminado con éxito' })
        } else {
            return res.status(404).json({ message: 'No existe Sucursal a eliminar' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}