import Vehicle from '../models/Vehicle';
import User from '../models/User';
import Chasis from '../models/Chasis';
import Modelo from '../models/Modelo';

const vehicleCtrl = {}

vehicleCtrl.createVehicle = async(req, res) => {
    const { cod_tdp, chasis, model, version, createdBy } = req.body;

    try {
        const foundChasis = await Chasis.findOne({name: chasis});
        const foundModelo = await Modelo.findOne({name: model});
        const foundEmployee = await User.findOne({ username: createdBy });

        if(!foundChasis) return res.status(404).json({message: `Chasis ${chasis} no encontrado`});
        if(!foundModelo) return res.status(404).json({message: `Modelo ${model} no encontrado`});
        if(!foundEmployee) return res.status(404).json({message: `Colaborador ${createdBy} no encontrado`});
        
        const newVehicle = new Vehicle({ cod_tdp, version });

        newVehicle.chasis = foundChasis._id;
        newVehicle.model = foundModelo._id;
        newVehicle.createdBy = foundEmployee._id;

        const query = await newVehicle.save();

        if (query) {
            res.json({ message: 'Vehículo creado con éxito' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }

}

vehicleCtrl.getVehicles = async(req, res) => {
    try {
        const query = await Vehicle.find()
            .select('chasis model cod_tdp version createdBy')
            .sort({ cod_tdp: 'asc' })
            .populate({
                path: 'chasis',
                select: 'name'
            })
            .populate({
                path: 'model',
                select: 'name marca avatar',
                populate:{
                    path: 'marca',
                    select: 'name avatar'
                }
            })
            .populate({
                path: 'createdBy',
                select: 'name username',
            });

        if (query.length > 0) {
            res.json({total: query.length, all_vehicles: query});
        } else {
            return res.status(404).json({ message: 'No existen vehículos' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

vehicleCtrl.getVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    try {
        const query = await Vehicle.findById(vehicleId)
        .select('chasis model cod_tdp version createdBy')
        .populate({
            path: 'chasis',
            select: 'name'
        })
        .populate({
            path: 'model',
            select: 'name marca avatar',
            populate:{
                path: 'marca',
                select: 'name avatar'
            }
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query) {
            res.json({vehicle: query});
        } else {
            return res.status(404).json({ message: 'No existe el Vehículo' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehicleByCodigo = async(req, res) => {
    const { cod_tdp } = req.body;
    try {
        const query = await Vehicle.findOne({ cod_tdp })
        .select('chasis model cod_tdp version createdBy')
        .populate({
            path: 'chasis',
            select: 'name'
        })
        .populate({
            path: 'model',
            select: 'name marca avatar',
            populate:{
                path: 'marca',
                select: 'name avatar'
            }
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if (query) {
            res.json({vehicle: query});
        } else {
            return res.status(404).json({ message: 'No existe vehículo a mostrar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehiculeByMarca = async(req, res) => {
    const { marca } = req.body;
    try {
        const query = await Vehicle.find()
        .select('chasis model cod_tdp version createdBy')
        .sort({ cod_tdp: 'asc' })
        .populate({
            path: 'chasis',
            select: 'name'
        })
        .populate({
            path: 'model',
            select: 'name marca avatar',
            populate:{
                path: 'marca',
                select: 'name avatar',
                match: { name: marca }
            }
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        const obj = query.filter(a => a.model.marca);
        
        if (obj.length > 0) {
            res.json({total: obj.length, vehicles: obj});
        } else {
            return res.status(404).json({ message: 'No existen Vehículos en esa Marca' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehiculeByModelo = async(req, res) => {
    const { modelo } = req.body;

    try {
        const query = await Vehicle.find()
        .select('chasis model cod_tdp version createdBy')
        .sort({ cod_tdp: 'asc' })
        .populate({
            path: 'chasis',
            select: 'name'
        })
        .populate({
            path: 'model',
            select: 'name marca avatar',
            match: { name: modelo },
            populate:{
                path: 'marca',
                select: 'name avatar'
            }
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        // console.log(query);

        const obj = query.filter(a => a.model);
        // console.log(obj);

        if (obj.length > 0) {
            res.json({total: obj.length, vehicles: obj});
        } else {
            return res.status(404).json({ message: 'No existen Vehículos en ese Modelo' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.updateVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    const { chasis, model, cod_tdp, version } = req.body;

    try {
        const chasisFound = await Chasis.findOne({name: chasis});
        const modelFound = await Modelo.findOne({name: model});

        if(!chasisFound) return res.status(404).json({message: `No existe chasis ${chasis}`});
        if(!modelFound) return res.status(404).json({message: `No existe modelo ${model}`});

        const query = await Vehicle.findByIdAndUpdate(vehicleId, { 
            chasis: chasisFound._id,
            model: modelFound._id,
            cod_tdp,
            version
        });
        if (query) {
            res.json({ message: 'Vehículo actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Vehículo a actualizar' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.deleteVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    try {
        const query = await Vehicle.findByIdAndDelete(vehicleId);
        if (query) {
            res.json({ message: 'Vehículo eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Vehículo a eliminar' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Vehicle.countDocuments();

        if (query >= 0) {
            res.json({ total_vehicles: query }); 
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default vehicleCtrl;