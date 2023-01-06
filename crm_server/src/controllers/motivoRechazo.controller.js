import MotivoRechazo from "../models/MotivoRechazo";
import User from "../models/User";

const rechazoController = {};

rechazoController.getAll = async (req, res) => {
	try {
		const query = await MotivoRechazo.find()
			.sort({ name: "asc" })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total: query.length, all: query });
		} else {
			return res.status(404).json({ message: "No existen motivos de rechazo" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

rechazoController.getOneById = async (req, res) => {
	const { motivoId } = req.params;
	try {
		const query = await MotivoRechazo.findById(motivoId).populate({
			path: "createdBy",
			select: "name username",
		});
		if (query) {
			res.json({ one: query });
		} else {
			return res.status(404).json({ message: "No existe motivo de rechazo" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

rechazoController.getAllActivos = async (req, res) => {
	try {
		const query = await MotivoRechazo.find({ status: true })
			.sort({ name: 1 })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total: query.length, all_active: query });
		} else {
			return res.status(404).json({ message: "No existen motivos de rechazo activos" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

rechazoController.createOne = async (req, res) => {
	const { name, status, createdBy } = req.body;
	try {
		const userFound = await User.findOne({ username: createdBy });
		const obj = new MotivoRechazo({ name, status });
		obj.createdBy = userFound._id;
		const query = await obj.save();
		if (query) {
			res.json({ message: "Motivo de rechazo creado con éxito" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

rechazoController.updateOneById = async (req, res) => {
	const { name, status } = req.body;
	const { motivoId } = req.params;
	try {
		const query = await MotivoRechazo.findByIdAndUpdate(motivoId, { name, status });
		if (query) {
			res.json({ message: "Motivo de rechazo actualizado con éxito" });
		} else {
			return res.status(404).json({ message: "No existe motivo de rechazo a actualizar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

rechazoController.deleteOneById = async (req, res) => {
	const { motivoId } = req.params;
	try {
		const query = await MotivoRechazo.findByIdAndDelete(motivoId);
		if (query) {
			res.json({ message: "Motivo de rechazo eliminado con éxito" });
		} else {
			return res.status(404).json({ message: "No existe motivo de rechazo a eliminar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export default rechazoController;