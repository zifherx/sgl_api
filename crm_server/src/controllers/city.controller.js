import City from "../models/City";
import User from "../models/User";

const cityController = {};

cityController.getAll = async (req, res) => {
	try {
		const query = await City.find()
			.sort({ name: "asc" })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total: query.length, all_cities: query });
		} else {
			return res.status(404).json({ message: "No existen Ciudades" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

cityController.getCityById = async (req, res) => {
	const { cityId } = req.params;
	try {
		const query = await City.findById(cityId).populate({
			path: "createdBy",
			select: "name username",
		});
		if (query) {
			res.json({ ciudad: query });
		} else {
			return res.status(404).json({ message: "No existe la Ciudad" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

cityController.getCityByActivo = async (req, res) => {
	try {
		const query = await City.find({ status: true })
			.sort({ name: "asc" })
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ active_total: query.length, active_cities: query });
		} else {
			return res.status(404).json({ message: "No existen Ciudad Activos" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

cityController.createCity = async (req, res) => {
	const { name, status, createdBy } = req.body;
	try {
		const userFound = await User.findOne({ username: createdBy });
		const obj = new City({ name, status });
		obj.createdBy = userFound._id;
		const query = await obj.save();
		if (query) {
			res.json({ message: "Ciudad creada con éxito" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

cityController.updateCity = async (req, res) => {
	const { cityId } = req.params;
	const { name, status } = req.body;
	try {
		const query = await City.findByIdAndUpdate(cityId, { name, status });
		if (query) {
			res.json({ message: "Ciudad actualizada con éxito" });
		} else {
			return res.status(404).json({ message: "No existe Ciudad a actualizar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

cityController.deleteCity = async (req, res) => {
	const { cityId } = req.params;
	try {
		const objeto = await City.findByIdAndDelete(cityId);
		if (objeto) {
			res.json({ message: "Ciudad eliminada con éxito" });
		} else {
			return res.status(404).json({ message: "No existe Ciudad a eliminar" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

export default cityController;
