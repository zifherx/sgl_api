import Role from '../models/Role'
import User from '../models/User'

const roleCtrl = {}

roleCtrl.getAll = async(req, res) => {
    try {
        const query = await Role.find()
        .sort({ name: 1 })
        .populate({
            path: 'createdBy',
            select: 'name username roles',
            populate: {
                path: 'roles',
                select: 'name'
            }
        });

        if (query.length > 0) {
            res.json({count: query.length, all_roles: query});
        } else {
            return res.status(404).json({ message: 'No existen Roles' })
        }

    } catch (err) {
        console.log(err)
        return res.status(503).json({ error: err.message })
    }
}

roleCtrl.getOneById = async(req, res) => {
    const { roleId } = req.params;
    try {
        const query = await Role.findById(roleId)
        .populate({
            path: 'createdBy',
            select: 'name username roles',
            populate: {
                path: 'roles',
                select: 'name'
            }
        });
        if (query) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existe el Rol' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ error: err.message });
    }
}

roleCtrl.getAllByStatus = async (req, res) => {
    try {
        const query = await Role.find({status: true})
        .sort({name: 1})
        .populate({
            path: 'createdBy',
            select: 'name username roles',
            populate: {
                path: 'roles',
                select: 'name'
            }
        });

        if(query.length > 0){
            res.json({count: query.length, roles_activos: query});
        }else{
            return res.status(404).json({message: 'No hay roles activos'});
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ error: err.message });
    }
}

roleCtrl.countAll = async(req, res) => {
    try {
        const query = await Role.countDocuments()
        if (query >= 0) {
            res.json({ nro_roles: query })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ error: err.message });
    }
}

roleCtrl.createRole = async(req, res) => {
    const { name, description, status, createdBy } = req.body;
    try {

        const newRole = new Role({ name, description, status });

        const userFound = await User.findOne({ username: createdBy })
        newRole.createdBy = userFound._id;

        const query = await newRole.save();

        if (query) {
            res.json({ message: 'Rol creado con éxito' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ error: err.message });
    }
}

roleCtrl.updateRoleById = async(req, res) => {
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
        return res.status(503).json({ error: err.message });
    }
}

roleCtrl.deleteRoleById = async(req, res) => {
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
        return res.status(503).json({ error: err.message });
    }
}

export default roleCtrl