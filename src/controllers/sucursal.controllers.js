import Sucursal from '../models/Sucursal'

export const getAll = async(req, res) => {
    try {
        const objeto = await Sucursal.find().sort({ name: 'asc' })
        if (objeto.length > 0) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existen Sucursal' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const getSucursalById = async(req, res) => {
    const { sucursalId } = req.params
    try {
        const objeto = await Sucursal.findById(sucursalId)
        if (objeto) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existe Sucursal' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const getSucursalByActivo = async(req, res) => {
    try {
        const objeto = await Sucursal.find({ status: true }).sort({ name: 'asc' })
        if (objeto.length > 0) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existen Sucursales Activos' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const createSucursal = async(req, res) => {
    const { name, status } = req.body;
    try {
        const nuevo = new Sucursal({ name, status })
        const objeto = await nuevo.save()
        if (objeto) {
            res.json({ message: 'Sucursal creada con éxito' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const updateSucursal = async(req, res) => {
    const { name, status } = req.body;
    const { sucursalId } = req.params;
    try {
        const objeto = await Sucursal.findByIdAndUpdate(sucursalId, { name, status })
        if (objeto) {
            res.json({ message: 'Sucursal actualizada con éxito' })
        } else {
            res.status(404).json({ message: 'No existe Sucursal a actualizar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const deleteSucursal = async(req, res) => {
    const { sucursalId } = req.params;
    try {
        const objeto = await Sucursal.findByIdAndDelete(sucursalId)
        if (objeto) {
            res.json({ message: 'Sucursal eliminado con éxito' })
        } else {
            return res.status(404).json({ message: 'No existe Sucursal a eliminar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}