import Role from '../models/Role'
import User from '../models/User'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

const userCtrl = {};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
});


userCtrl.getAll = async(req, res) => {
    try {
        const query = await User.find().sort({ name: 'asc' }).populate('roles userCreator');

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Usuarios' })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.getOne = async(req, res) => {
    const { userId } = req.params;
    try {
        const query = await User.findById(userId).populate('roles userCreator');
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existe el Usuario' })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.createUser = async(req, res) => {
    const { name, username, password, email, cellphone, titlePerfil, rutaPerfil, description, roles, userCreator } = req.body;
    try {
        const newUser = new User({
            name,
            username,
            password: await User.encryptPassword(password),
            email,
            cellphone,
            titlePerfil,
            rutaPerfil,
            description
        });

        const userFound = await User.find({ username: userCreator })
        newUser.userCreator = userFound.map(a => a._id)

        if (roles) {
            const foundRole = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRole.map(b => b._id);
        } else {
            const rol = await Role.findOne({ name: 'Usuario' });
            newUser.roles = [rol._id];
        }

        const query = await newUser.save();

        if (query) {
            res.json({ message: 'Usuario creado con éxito' });
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.updateUser = async(req, res) => {
    const { userId } = req.params;
    const { roles, status, userCreator } = req.body;
    try {
        const roleFound = await Role.find({ name: roles })
        const userFound = await User.find({ username: userCreator })

        const query = await User.findByIdAndUpdate(userId, {
            roles: roleFound.map(a => a._id),
            status,
            userCreator: userFound.map(b => b._id)
        });
        if (query) {
            res.json({ message: 'Usuario actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.updateProfile = async(req, res) => {
    const { userId, email, cellphone, description } = req.body
    const data_image = req.file
    try {
        //Cloudinary
        // console.log(data_image);
        const response = await cloudinary.uploader.upload(data_image.path);
        const query = await User.findByIdAndUpdate(userId, { email, cellphone, description, rutaPerfil: response.secure_url, titlePerfil: response.public_id });
        // console.log(query)

        if (query) {
            await fs.unlink(data_image.path) //Eliminando ruta del servidor
            res.json({ message: 'Perfil actualizado con éxito' })
        } else {
            return res.status(404).json({ message: 'Perfil no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.deleteUser = async(req, res) => {
    const { userId } = req.params;
    try {
        const query = await User.findByIdAndRemove(userId);

        if (query) {
            res.json({ message: 'Usuario eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

userCtrl.getCountAll = async(req, res) => {
    try {
        const query = await User.estimatedDocumentCount()
        if (query >= 0) {
            res.json({ nro_users: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.getCountByStatus = async(req, res) => {
    const { status } = req.body
    try {
        const query = await User.where({ status }).countDocuments()
        if (query >= 0) {
            res.json({ nro_users_status: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

userCtrl.getCountByOnline = async(req, res) => {
    const { online } = req.body
    try {
        const query = await User.where({ online }).countDocuments()
        if (query >= 0) {
            res.json({ nro_users_online: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default userCtrl;