import Vehicle from '../models/Vehicle'
import User from '../models/User'

const vehicleCtrl = {}

vehicleCtrl.createVehicle = async(req, res) => {
    const { marca, cod_tdp, categoria, modelo, version, userCreator } = req.body;

    try {
        const newVehicle = new Vehicle({ marca, cod_tdp, categoria, modelo, version });

        const foundEmployee = await User.find({ username: { $in: userCreator } });
        newVehicle.userCreator = foundEmployee.map(em => em._id);

        const vehicleSaved = await newVehicle.save();

        if (vehicleSaved) {
            res.json({ message: 'Vehículo creado con éxito' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }

}

vehicleCtrl.getVehicles = async(req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ cod_tdp: 'asc' });

        if (vehicles.length > 0) {
            res.json(vehicles);
        } else {
            return res.status(404).json({ message: 'No existen vehículos' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (vehicle) {
            res.json(vehicle);
        } else {
            return res.status(404).json({ message: 'No existe el Vehículo' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehicleByCodigo = async(req, res) => {
    const { codigoAuto } = req.body;
    try {
        const query = await Vehicle.findOne({ cod_tdp: codigoAuto });
        if (query) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existe vehículo a mostrar' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehiculeByMarca = async(req, res) => {
    const { marca } = req.body;
    try {
        const query = await Vehicle.find({ marca });
        if (query.length > 0) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existen Vehículos en esa Marca' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getVehiculeByModelo = async(req, res) => {
    const { modelo } = req.body;
    try {
        const query = await Vehicle.find({ modelo });
        if (query.length > 0) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existen Vehículos en ese Modelo' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.updateVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    const { marca, cod_tdp, categoria, modelo, version } = req.body;

    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, { marca, cod_tdp, categoria, modelo, version });
        if (updatedVehicle) {
            res.json({ message: 'Vehículo actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Vehículo a actualizar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.deleteVehicleById = async(req, res) => {
    const { vehicleId } = req.params;
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
        if (deletedVehicle) {
            res.json({ message: 'Vehículo eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Vehículo a eliminar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

vehicleCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Customer.estimatedDocumentCount()

        if (query >= 0) {
            res.json({ nro_customer: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default vehicleCtrl;