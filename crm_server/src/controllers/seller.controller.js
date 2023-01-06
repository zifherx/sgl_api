import Seller from "../models/Seller";
import User from "../models/User";
import Marca from "../models/Marca";
import Sucursal from "../models/Sucursal";

const sellerCtrl = {};

sellerCtrl.getAll = async (req, res) => {
	try {
		const query = await Seller.find()
			.sort({ name: "asc" })
			.populate({
				path: "marca",
				select: "name avatar",
			})
			.populate({
				path: "sucursal",
				select: "name",
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total_sellers: query.length, all_sellers: query });
		} else {
			return res.status(404).json({ message: "No existen Asesores de Ventas" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.getOne = async (req, res) => {
	const { sellerId } = req.params;
	try {
		const query = await Seller.findById(sellerId)
			.populate({
				path: "marca",
				select: "name avatar",
			})
			.populate({
				path: "sucursal",
				select: "name",
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query) {
			res.json({ seller: query });
		} else {
			return res.status(404).json({ message: "No existe el Asesor de Ventas" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.createSeller = async (req, res) => {
	const { name, document, cellphone, email, tipo, marca, sucursal, status, createdBy } = req.body;
	try {
		const userFound = await User.findOne({ username: createdBy });
		if (!userFound) return res.status(404).json({ message: `No existe el usuario ${createdBy}` });

		const marcaFound = await Marca.findOne({ name: marca });
		if (!marcaFound) return res.status(404).json({ message: `No existe la marca ${marca}` });

		const sucursalFound = await Sucursal.findOne({ name: sucursal });
		if (!sucursalFound) return res.status(404).json({ message: `No existe la sucursal ${sucursal}` });

		const obj = new Seller({
			name,
			document,
			cellphone,
			email,
			tipo,
			status,
		});
		obj.marca = marcaFound._id;
		obj.sucursal = sucursalFound._id;
		obj.createdBy = userFound._id;

		const query = await obj.save();

		if (query) {
			res.json({ message: "Asesor de Ventas creado con éxito" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.updateSeller = async (req, res) => {
	const { sellerId } = req.params;
	const { name, document, cellphone, email, tipo, marca, sucursal, status } = req.body;
	try {
		const marcaFound = await Marca.findOne({ name: marca });
		const sucursalFound = await Sucursal.findOne({ name: sucursal });

		if (!marcaFound) return res.status(404).json({ message: `No existe la marca ${marca}` });
		if (!sucursalFound) return res.status(404).json({ message: `No existe la sucursal ${sucursal}` });

		const query = await Seller.findByIdAndUpdate(sellerId, {
			name,
			document,
			cellphone,
			email,
			tipo,
			marca: marcaFound._id,
			sucursal: sucursalFound._id,
			status,
		});

		if (query) {
			res.json({ message: "Asesor de Ventas actualizado con éxito" });
		} else {
			return res.status(404).json({ message: "Asesor de Ventas no encontrado" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.deleteSeller = async (req, res) => {
	const { sellerId } = req.params;
	try {
		const query = await Seller.findByIdAndRemove(sellerId);

		if (query) {
			res.json({ message: "Asesor de Ventas eliminado con éxito" });
		} else {
			return res.status(404).json({ message: "Asesor de Ventas no encontrado" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.getCountAll = async (req, res) => {
	try {
		const query = await Seller.countDocuments();

		if (query >= 0) {
			res.json({ total_count: query });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.getSellersByActive = async (req, res) => {
	try {
		const query = await Seller.find({ status: true })
			.sort({ name: "asc" })
			.populate({
				path: "marca",
				select: "name avatar",
			})
			.populate({
				path: "sucursal",
				select: "name",
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ total_actives: query.length, active_actives: query });
		} else {
			return res.status(404).json({ message: "No existen Asesores de Ventas Activos" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.getSellersBySucursal = async (req, res) => {
	const { sucursal } = req.body;
	try {
		const query = await Seller.find()
			.sort({ name: "asc" })
			.populate({
				path: "marca",
				select: "name avatar",
			})
			.populate({
				path: "sucursal",
				select: "name",
				match: { name: sucursal },
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});

		const obj = query.filter((a) => a.sucursal);

		if (obj.length > 0) {
			res.json({ total: obj.length, deploy: obj });
		} else {
			return res.status(404).json({ message: `No existen Asesores de Ventas en ${sucursal}` });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

sellerCtrl.updatePhoto = async (req, res) => {
	const { sellerId } = req.params;
	const avatar = req.file;

	try {
		const query = await Seller.findByIdAndUpdate(sellerId, {
			avatar: avatar.location,
		});
		if (query) {
			res.json({ message: "Foto de Vendedor subida con éxito" });
		} else {
			return res.status(404).json({ message: "Vendedor no encontrado" });
		}
	} catch (err) {
		console.error(err);
		return res.status(503).json({ message: err.message });
	}
};

export default sellerCtrl;
