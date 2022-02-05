import Chasis from "../models/Chasis";
import User from "../models/User";

export const getAll = async (req, res) => {
	try {
		const query = await Chasis.find()
			.sort({ name: "asc" })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total: query.length, all_chasis: query });
		} else {
			return res.status(404).json({ message: "No existen Chasis" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export const getChasisById = async (req, res) => {
	const { chasisId } = req.params;
	try {
		const query = await Chasis.findById(chasisId).populate({
			path: "createdBy",
			select: "name username",
		});
		if (query) {
			res.json({ chasis: query });
		} else {
			return res.status(404).json({ message: "No existe Chasis" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export const getChasisByActivo = async (req, res) => {
	try {
		const query = await Chasis.find({ status: true })
			.sort({ name: 1 })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total: query.length, chasis_activos: query });
		} else {
			return res.status(404).json({ message: "No existen Chasis Activos" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export const createChasis = async (req, res) => {
	const { name, status, createdBy } = req.body;
	try {
		const userFound = await User.findOne({ username: createdBy });
		const obj = new Chasis({ name, status });
		obj.createdBy = userFound._id;
		const query = await obj.save();
		if (query) {
			res.json({ message: "Chasis creado con éxito" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export const updateChasis = async (req, res) => {
	const { name, status } = req.body;
	const { chasisId } = req.params;
	try {
		const query = await Chasis.findByIdAndUpdate(chasisId, { name, status });
		if (query) {
			res.json({ message: "Chasis actualizado con éxito" });
		} else {
			return res.status(404).json({ message: "No existe Chasis a actualizar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export const deleteChasis = async (req, res) => {
	const { chasisId } = req.params;
	try {
		const query = await Chasis.findByIdAndDelete(chasisId);
		if (query) {
			res.json({ message: "Chasis eliminado con éxito" });
		} else {
			return res.status(404).json({ message: "No existe Chasis a eliminar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};
