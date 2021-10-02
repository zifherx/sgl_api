import Lead from "../models/Lead";
import User from "../models/User";
import Seller from '../models/Seller'

const leadCtrl = {}

leadCtrl.getAll = async(req, res) => {
    try {
        const query = await Lead.find().populate('asesorVenta userCreator').sort({ name: 'asc' })
        if (query.length > 0) {
            res.json({ nro_leads: query.length, leads: query })
        } else {
            return res.status(404).json({ message: 'No existen Leads' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.getLeadsIngresados = async(req, res) => {
    try {
        const query = await Lead.where({ status_asignado: false, statusLead: false }).populate('asesorVenta userCreator')
        if (query.length > 0) {
            res.json({ nro_leads: query.length, leads: query })
        } else {
            return res.status(404).json({ message: 'No existen nuevos Leads' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.getLeadsAsignados = async(req, res) => {
    try {
        const query = await Lead.where({ status_asignado: true, statusLead: false }).find().populate('asesorVenta')
        if (query.length > 0) {
            res.json({ nro_leads: query.length, leads: query });
        } else {
            return res.status(404).json({ message: 'No existen Leads asignados' })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.getLeadsAtendidos = async(req, res) => {
    try {
        const query = await Lead.where({ status_asignado: true, statusLead: true }).find().populate('asesorVenta userCreator')
        if (query.length > 0) {
            res.json({ nro_leads: query.length, leads: query });
        } else {
            return res.status(404).json({ message: 'No existen Leads atendidos' })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.getOne = async(req, res) => {
    const { leadId } = req.params;
    try {
        const query = await Lead.findById(leadId).populate('asesorVenta userCreator');
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: `No existe el Lead ${leadId}` })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.createLead = async(req, res) => {
    const {
        sucursal_lead,
        dataOrigin,
        customer_name,
        customer_document,
        customer_address,
        customer_city,
        customer_cellphone,
        customer_email,
        fecha_ingreso,
        fecha_asignacion,
        fecha_atencion,
        userCreator
    } = req.body;
    try {
        const newObj = new Lead({
            sucursal_lead,
            dataOrigin,
            customer_name,
            customer_document,
            customer_address,
            customer_city,
            customer_cellphone,
            customer_email,
            fecha_ingreso,
            fecha_asignacion,
            fecha_atencion
        });

        const userFound = await User.find({ username: userCreator })
        newObj.userCreator = userFound.map(a => a._id)

        const query = await newObj.save();

        if (query) {
            res.json({ message: 'Lead creado con éxito' });
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

leadCtrl.asignarLead = async(req, res) => {
    const { leadId } = req.params;
    const { status_asignado, fecha_asignacion, asesorVenta, jefeAsignador } = req.body;

    try {

        const jefeFound = await User.find({ username: jefeAsignador })
        const sellerFound = await Seller.find({ name: { $in: asesorVenta } })
        const query = await Lead.findByIdAndUpdate(leadId, {
            status_asignado,
            fecha_asignacion,
            asesorVenta: sellerFound.map(a => a._id),
            jefeAsignador: jefeFound.map(b => b._id)
        })

        if (query) {
            res.json({ message: 'Lead asignado con éxito' });
        } else {
            return res.status(404).json({ message: 'Lead no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

leadCtrl.atenderLead = async(req, res) => {
    const { leadId } = req.params;
    const { statusLead, modeloVehiculo, versionVehiculo, fecha_atencion, comentario, tipo_pago, valorUnidad, tipo_financiamiento, asesorAtencion } = req.body;
    try {
        const sellerFound = await User.find({ username: asesorAtencion })
        const query = await Lead.findByIdAndUpdate(leadId, {
            statusLead,
            modeloVehiculo,
            versionVehiculo,
            fecha_atencion,
            comentario,
            tipo_pago,
            valorUnidad,
            tipo_financiamiento,
            asesorAtencion: sellerFound.map(a => a._id)
        });
        if (query) {
            res.json({ message: 'Lead actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Lead no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

leadCtrl.actualizarVenta = async(req, res) => {
    const { leadId } = req.params;
    const { lead_convertido, estatus_venta } = req.body;
    try {
        const query = await Lead.findByIdAndUpdate(leadId, {
            lead_convertido,
            estatus_venta
        });
        if (query) {
            res.json({ message: 'Estatus de Venta actualizado con éxito' })
        } else {
            return res.status(404).json({ message: 'Venta no encontrada' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

leadCtrl.deleteLead = async(req, res) => {
    const { leadId } = req.params;
    try {
        const query = await Lead.findByIdAndRemove(leadId);

        if (query) {
            res.json({ message: 'Lead eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Lead no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

leadCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Lead.estimatedDocumentCount()

        if (query >= 0) {
            res.json({ nro_Leads: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.getCountByStatus = async(req, res) => {
    const { atendidos, asignados } = req.body;
    try {
        if (atendidos) {
            const query = await Lead.where({ statusLead: atendidos }).find().countDocuments();
            if (query >= 0) return res.json({ leads_atendidos: query })
        } else {
            const query2 = await Lead.where({ status_asignado: asignados }).find().countDocuments();
            if (query2 >= 0) return res.json({ leads_asignados: query2 })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.conteoVentasByStatus = async(req, res) => {
    const { estado_venta } = req.body;
    try {
        const query = await Lead.where({ status_asignado: true, statusLead: true, estatus_venta: estado_venta }).find().countDocuments();
        if (query >= 0) {
            res.json({ status_elegido: estado_venta, countVentas: query })
        } else {
            return res.status(404).json({ message: `No existen ventas en ${estado_venta}` })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.conteoLeadsAsignadosByVendedor = async(req, res) => {
    const { sucursal, statusAsignado, start, end } = req.body;

    try {
        const filter = { sucursal_lead: sucursal, status_asignado: statusAsignado, fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } };

        const query = await Lead.aggregate([{
            $match: filter
        }, {
            $group: {
                _id: '$asesorVenta',
                leads_asignados: { $sum: 1 }
            }
        }]);

        if (query.length > 0) {
            res.json({ nro_vendedores: query.length, tablero: query })
        } else {
            return res.status(404).json({ message: 'No existe data aún' })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.conteoLeadsAtendidosByVendedor = async(req, res) => {
    const { sucursal, statusAsignado, statusLead, start, end } = req.body;

    try {
        const filter = { sucursal_lead: sucursal, status_asignado: statusAsignado, statusLead, fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } };

        const query = await Lead.aggregate([{
            $match: filter
        }, {
            $group: {
                _id: '$asesorVenta',
                leads_atendidos: { $sum: 1 }
            }
        }]);

        if (query.length > 0) {
            res.json({ nro_vendedores: query.length, tablero: query })
        } else {
            return res.status(404).json({ message: 'No existe data aún' })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.conteoLeadsbyOrigen = async(req, res) => {
    const { origen, start, end } = req.body;

    try {
        const query = await Lead.where({ dataOrigin: origen, fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } }).find().countDocuments();
        if (query.length >= 0) {
            res.json({ data_origen: origen, conteo: query })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

leadCtrl.conteoLeadsAtendidosxModelo = async(req, res) => {
    const { sucursal, start, end } = req.body;

    try {
        const filtro = { sucursal_lead: sucursal, fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } }

        const query = await Lead.aggregate([
            { $match: filtro }, {
                $group: {
                    _id: '$modeloVehiculo',
                    conteo: { $sum: 1 }
                }
            }
        ])

        // console.log(query)

        if (query.length > 0) {
            res.json({ nro_modelos: query.length, tablero: query })
        } else {
            return res.status(404).json({ message: 'No existe data aún' })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

export default leadCtrl;