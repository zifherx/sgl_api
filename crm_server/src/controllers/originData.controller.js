import OriginData from "../models/OriginData";
import User from '../models/User';

const originCtrl = {};

originCtrl.getAll = async (req, res) => {
	try {
		const query = await OriginData.find()
            .select('name status createdBy')
			.sort({ name: 1 })
			.populate({
				path: "createdBy",
				select: "name username",
			});

		if (query.length > 0) {
			res.json({ total: query.length, all_origins: query });
		} else {
			return res.status(404).json({ message: "No existen orígenes" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

originCtrl.getActivos = async (req, res) => {
	try {
		const query = await OriginData.find({ status: true })
            .select('name status createdBy')
			.sort({ name: 1 })
			.populate({
				path: "createdBy",
				select: "name username",
			});

		if (query.length > 0) {
			res.json({ total_actives: query.length, active_origins: query });
		} else {
			return res.status(404).json({ message: "No existen orígenes activos" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

originCtrl.getOneById = async (req, res) => {
    const {originId} = req.params;
	try {
        const query = await OriginData.findById(originId)
            .select('name status createdBy')
			.populate({
				path: "createdBy",
				select: "name username",
			});

		if (query) {
			res.json({ origin: query });
		} else {
			return res.status(404).json({ message: "No existen el orígen" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

originCtrl.createOne = async (req, res) => {
    const {name, status, createdBy} = req.body;
	try {
		
		const userFound = await User.findOne({ username: createdBy });
		if(!userFound) return res.status(404).json({message: `Colaborador ${ createdBy} no encontrado`});
        
		const newObj = new OriginData({name, status});
        newObj.createdBy = userFound._id;

        const query = newObj.save();

        if(query){
            res.json({message: 'Origen creado con éxito'});
        }
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

originCtrl.updateOneById = async (req, res) => {
    const {originId} = req.params;
    const {name, status} = req.body;
	try {
        const query = await OriginData.findByIdAndUpdate(originId,{ name, status});
        if (query) {
			res.json({ message: 'Origen actualizado con éxito' });
		} else {
			return res.status(404).json({ message: "No se encuentra el origen para actualizar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

originCtrl.deleteOneById = async (req, res) => {
    const {originId} = req.params;
	try {
        const query = await OriginData.findByIdAndDelete(originId);

		if (query) {
			res.json({ message: 'Origen eliminado con éxito' });
		} else {
			return res.status(404).json({ message: "No se encuentra el origen para eliminar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export default originCtrl;
