import Role from "../models/Role";
import User from "../models/User";
import Sucursal from '../models/Sucursal';
import Marca from '../models/Marca';

const userCtrl = {};

userCtrl.getAll = async (req, res) => {
	try {
		const query = await User.find()
			.select("-password")
			.sort({ name: 1 })
			.populate({
				path: "roles",
				select: "name",
			})
			.populate({
				path: 'sucursal',
				select: 'name'
			})
			.populate({
				path: 'marca',
				select: 'name avatar'
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});

		if (query.length > 0) {
			res.json({ total_count: query.length, all_users: query });
		} else {
			return res.status(404).json({ message: "No existen Usuarios" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

userCtrl.getOneById = async (req, res) => {
	const { userId } = req.params;
	try {
		const query = await User.findById(userId)
			.select("-password")
			.populate({
				path: "roles",
				select: "name",
			})
			.populate({
				path: 'sucursal',
				select: 'name'
			})
			.populate({
				path: 'marca',
				select: 'name avatar'
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});

		if (query) {
			res.json({ founded: query });
		} else {
			return res.status(404).json({ message: "No existe el Usuario" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.createUser = async (req, res) => {
	const { name, username,email, cellphone, password, sucursal, marca, roles, createdBy } = req.body;
	try {
		const newUser = new User({
			name,
			username,
			email, 
			cellphone,
			password: await User.encryptPassword(password),
		});

		const userFound = await User.findOne({ username: createdBy });
		newUser.createdBy = userFound._id;

		const sucursalFound = await Sucursal.findOne({name: sucursal});
		if(!sucursalFound) return res.status(404).json({message: `Sucursal ${sucursal} no encontrada`})
		newUser.sucursal = sucursalFound._id;
		
		const marcaFound = await Marca.find({name: marca});
		if(!marcaFound) return res.status(404).json({message: `Marca ${marca} no encontrada`})
		newUser.marca = marcaFound.map(a => a._id);

		if (roles) {
			const foundRole = await Role.find({ name: { $in: roles } });
			newUser.roles = foundRole.map((b) => b._id);
		} else {
			const rol = await Role.findOne({ name: "Usuario" });
			newUser.roles = [rol._id];
		}

		const query = await newUser.save();

		if (query) {
			res.json({ message: "Usuario creado con éxito" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.updateUser = async (req, res) => {
	const { userId } = req.params;
	const { name,username, roles,email, cellphone,marca, sucursal, status } = req.body;
	// console.log(req.body);
	try {
		const roleFound = await Role.find({ name: {$in: roles} });
		const sucursalFound = await Sucursal.findOne({name: sucursal});
		
        if(!sucursalFound) return res.status(404).json({message: `Sucursal ${sucursal} no encontrada`});
        if(!roleFound) return res.status(404).json({message: `No existe el rol ${roles}`});

		const marcaFound = await Marca.find({name: marca});
		if(!marcaFound) return res.status(404).json({message: `Marca ${marca} no encontrada`})

		const query = await User.findByIdAndUpdate(userId, {
            name,
			username,
			email,
			cellphone,
			sucursal: sucursalFound._id,
			marca: marcaFound.map(a => a._id),
			roles: roleFound.map(a => a._id),
			status,
		});
		if (query) {
			res.json({ message: "Usuario actualizado con éxito" });
		} else {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ message: err.message });
	}
};

userCtrl.updateProfile = async (req, res) => {
	const { userId } = req.params;
	const { email, cellphone, description } = req.body;
	const avatar = req.file;
	let query = null;
	try {
		if(avatar == null || avatar == undefined){
			query = await User.findByIdAndUpdate(userId, {
				email,
				cellphone,
				description
			});
		}else{
			query = await User.findByIdAndUpdate(userId, {
				email,
				cellphone,
				description,
				avatar: avatar.location,
			});
		}

		if (query) {
			res.json({ message: "Perfil actualizado con éxito" });
		} else {
			return res.status(404).json({ message: "Perfil no encontrado" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.deleteUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const query = await User.findByIdAndDelete(userId);

		if (query) {
			res.json({ message: "Usuario eliminado con éxito" });
		} else {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.getCountAll = async (req, res) => {
	try {
		const query = await User.countDocuments();
		if (query >= 0) {
			res.json({ nro_users: query });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.getAllByStatus = async (req, res) => {
	try {
		const query = await User.find({ status: true })
			.select("-password")
			.sort({ name: 1 })
			.populate({
				path: "roles",
				select: "name",
			})
			.populate({
				path: "createdBy",
				select: "name username",
			});
		if (query.length > 0) {
			res.json({ count_activos: query.length, users_activos: query });
		}else{
            return res.status(404).json({message: 'No existen usuarios activos'});
        }
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.getCountByOnline = async (req, res) => {
	const { online } = req.body;
	try {
		const query = await User.where({ online }).countDocuments();
		if (query >= 0) {
			res.json({ nro_users_online: query });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
};

userCtrl.uploadPhoto = async (req, res) =>{
	const { userId } = req.params;
	const avatar = req.file;

	let query = null;

	try {
		if(avatar == null || avatar == undefined){
			return res.status(404).json({message: 'No se ha cargado avatar'});
		}else{
			query = await User.findByIdAndUpdate(userId, {
				avatar: avatar.location,
			});
		}

		if (query) {
			res.json({ message: "Avatar subido con éxito" });
		} else {
			return res.status(404).json({ message: "Perfil no encontrado" });
		}
	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: err.message });
	}
}

export default userCtrl;
