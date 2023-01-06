import Marca from "../models/Marca";
import User from "../models/User";

const marcaController = {};

marcaController.getAll = async(req, res) => {
    try {
        const query = await Marca.find()
        .sort({ name: 'asc' })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query.length > 0) {
            res.json({total_brands: query.length, all_brands: query});
        } else {
            return res.status(404).json({ message: 'No existen Marcas' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

marcaController.getMarcaById = async(req, res) => {
    const { marcaId } = req.params;
    try {
        const query = await Marca.findById(marcaId)
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query) {
            res.json({brand: query});
        } else {
            return res.status(404).json({ message: 'No existe Marca' })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

marcaController.getMarcaByActivo = async(req, res) => {
    try {
        const query = await Marca.find({ status: true })
        .sort({ name: 'asc' })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query.length > 0) {
            res.json({total_actives: query.length, active_brands: query});
        } else {
            return res.status(404).json({ message: 'No existen Marcas Activas' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

marcaController.createMarca = async(req, res) => {
    const { name, status,createdBy } = req.body;
    const avatar = req.file;
    try {
        let obj = null;

        const userFound =  await User.findOne({username: createdBy});
        if(!userFound) return res.status(404).json({message: 'No existe usuario'});

        if(avatar == undefined || avatar == null){
            obj = new Marca({ name, status });
            obj.createdBy = userFound._id;
        }else{
            obj = new Marca({ 
                name,
                status,
                avatar: avatar.location
            });
            obj.createdBy = userFound._id;
        }

        const query = await obj.save();

        if (query) {
            res.json({ message: 'Marca creada con éxito' })
        }
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

marcaController.updateMarca = async(req, res) => {
    const { marcaId } = req.params;
    const { name, status } = req.body;
    const avatar = req.file;
    try {
        let query = null;

        if(avatar == null || avatar == undefined){
            query = await Marca.findByIdAndUpdate(marcaId, { name, status });
        }else{
            query = await Marca.findByIdAndUpdate(marcaId, {
                name,
                status,
                avatar: avatar.location
            });
        }
        if (query) {
            res.json({ message: 'Marca actualizada con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Marca a eliminar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

marcaController.deleteMarca = async(req, res) => {
    const { marcaId } = req.params;
    try {
        const query = await Marca.findByIdAndDelete(marcaId);
        if (query) {
            res.json({ message: 'Marca eliminada con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Marca a eliminar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export default marcaController;