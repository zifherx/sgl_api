import Role from '../models/Role'
import User from '../models/User'

const roleCtrl = {}

roleCtrl.getAll = async(req, res) => {
    try {
        const query = await Role.find().sort({ name: 'asc' }).populate('userCreator')

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Roles' })
        }

    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

roleCtrl.getOne = async(req, res) => {
    const { roleId } = req.params;
    try {
        const query = await Role.findById(roleId).sort({ name: 'asc' })
        if (query) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existe el Rol' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

roleCtrl.getCount = async(req, res) => {
    try {
        const query = await Role.estimatedDocumentCount()
            // console.log(query)
        if (query >= 0) {
            res.json({ nro_roles: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

roleCtrl.createRole = async(req, res) => {
    const { name, description, status, userCreator } = req.body;
    try {

        const newRole = new Role({ name, description, status });

        const userFound = await User.find({ username: userCreator })
        newRole.userCreator = userFound.map(a => a._id)

        const query = await newRole.save();

        if (query) {
            res.json({ message: 'Rol creado con éxito' });
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

roleCtrl.updateRole = async(req, res) => {
    const { roleId } = req.params;
    const { name, description, status } = req.body;
    try {
        const query = await Role.findByIdAndUpdate(roleId, {
            name,
            description,
            status
        });

        if (query) {
            res.json({ message: 'Rol actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

roleCtrl.deleteRole = async(req, res) => {
    const { roleId } = req.params;
    try {
        const query = await Role.findByIdAndDelete(roleId);
        if (query) {
            res.json({ message: 'Rol eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Rol no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export default roleCtrl