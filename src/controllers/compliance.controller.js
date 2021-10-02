import Compliance from "../models/Compliance";
import Seller from '../models/Seller'
import User from '../models/User'

const cumplimientoCtrl = {};

cumplimientoCtrl.getAll = async(req, res) => {
    try {
        const query = await Compliance.find();

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existe tabla de Cumplimiento' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

cumplimientoCtrl.getOne = async(req, res) => {
    const { complianceId } = req.params
    try {
        const query = await Compliance.findById(complianceId);

        if (query) {
            res.json({ encontrado: query })
        } else {
            return res.status(404).json({ message: 'No existe el cumplimiento' })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

cumplimientoCtrl.createCumplimiento = async(req, res) => {
    const { asesor_venta, nro_asignados, nro_atendidos, nro_vendidos, meta_asignados, meta_atendidos, meta_vendidos, sucursal, anio, mes, userCreator } = req.body;

    try {
        const nuevoObjeto = new Compliance({
            nro_asignados,
            nro_atendidos,
            nro_vendidos,
            meta_asignados,
            meta_atendidos,
            meta_vendidos,
            sucursal,
            anio,
            mes
        })

        const asesorFound = await Seller.find({ name: asesor_venta });
        nuevoObjeto.asesor_venta = asesorFound.map(a => a._id);

        const creador = await User.find({ username: userCreator });
        nuevoObjeto.userCreator = creador.map(b => b._id);

        const query = await nuevoObjeto.save();

        if (query) {
            res.json({ message: 'Cumplimiento creado con éxito' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })

    }
}

cumplimientoCtrl.eliminarCumpimiento = async(req, res) => {
    const { complianceId } = req.params;
    try {
        const query = await Compliance.findByIdAndRemove(complianceId);

        if (query) {
            res.json({ message: 'Cumplimiento eliminado con éxito' })
        } else {
            return res.status(404).json({ message: 'Cumplimiento no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

cumplimientoCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Compliance.countDocuments();

        if (query > 0) return res.json({ nro_registros: query })
        if (query == 0) return res.json({ message: 'No existen registros' })
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

cumplimientoCtrl.getByAsesor = async(req, res) => {
    const { asesor } = req.body;

    try {
        const asesorEncontrado = await Seller.findOne({ name: asesor });

        if (!asesorEncontrado) return res.status(404).json({ message: 'Asesor no encontrado' })

        const query = await Compliance.where({ asesor_venta: asesorEncontrado._id }).find();

        if (query.length > 0) {
            res.json({ nro_registros: query.length, registros: query })
        } else {
            return res.status(404).json({ message: 'No cuenta con metas registradas ' })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

cumplimientoCtrl.getCumplimientosxFecha = async(req, res) => {
    const { sucursal, start, end } = req.body;

    try {
        const query = await Compliance.where({ sucursal, fecha: { $gte: new Date(start), $lte: new Date(end) } }).find()

        if (query.length > 0) {
            res.json({ nro_registros: query.length, registros: query })
        } else {
            return res.status(404).json({ message: `No hay registros en ${sucursal} en esas fechas` })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default cumplimientoCtrl;