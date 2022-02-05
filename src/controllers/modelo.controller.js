import Modelo from "../models/Modelo";
import User from "../models/User";
import Marca from "../models/Marca";

export const getModelos = async(req, res) => {
    try {
        const query = await Modelo.find()
            .sort({ name: 'asc' })
            .populate({
                path: 'marca',
                select: 'name avatar'
            })
            .populate({
                path: 'createdBy',
                select: 'name username',
            });
        if (query.length > 0) {
            res.json({total_models: query.length, all_models: query});
        } else {
            return res.status(404).json({ message: 'No existen Modelos' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const getModeloById = async(req, res) => {
    const { modeloId } = req.params;
    try {
        const query = await Modelo.findById(modeloId)
        .populate({
            path: 'marca',
            select: 'name avatar'
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query) {
            res.json({modelo: query});
        } else {
            return res.status(404).json({ message: 'No existe el Modelo' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const getModeloByActivo = async(req, res) => {
    try {
        const query = await Modelo.find({ status: true })
        .sort({ name: 'asc' })
        .populate({
            path: 'marca',
            select: 'name avatar'
        })
        .populate({
            path: 'createdBy',
            select: 'name username',
        });
        if (query.length > 0) {
            res.json({total_active: query.length, active_models: query});
        } else {
            return res.status(404).json({ message: 'No existen Modelos Activos' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const createModelo = async(req, res) => {
    const { name, marca, status,createdBy } = req.body;
    const avatar = req.file;
    try {
        let obj = null;
        const userFound = await User.findOne({username: createdBy});
        if(!userFound) return res.status(404).json({message: `No existe la usuario ${createdBy}`})

        const marcaFound = await Marca.findOne({name: marca});        
        if(!marcaFound) return res.status(404).json({message: `No existe la marca ${marca}`})

        if(avatar == undefined || avatar == null){
            obj = new Modelo({ name, status });
            obj.marca = marcaFound._id;
            obj.createdBy = userFound._id;
        }else{
            obj = new Modelo({ name, status });
            obj.marca = marcaFound._id;
            obj.createdBy = userFound._id;
            obj.avatar = avatar.location;

        }
        const query = await obj.save();
        if (query) {
            res.json({ message: 'Modelo creado con éxito' })
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const updateModelo = async(req, res) => {
    const { modeloId } = req.params;
    const { name, marca, status } = req.body;
    const avatar = req.file;
    try {
        let query = null;
        const marcaFound = await Marca.findOne({name: marca});
        if(!marcaFound) return res.status(404).json({message: `No existe la marca ${marca}`})
        
        if(avatar == undefined || avatar == null){
            query = await Modelo.findByIdAndUpdate(modeloId, { 
                name,
                status,
                marca: marcaFound._id,
            });
        }else{
            query = await Modelo.findByIdAndUpdate(modeloId, { 
                name,
                status,
                marca: marcaFound._id,
                avatar: avatar.location
            });

        }
        if (query) {
            res.json({ message: 'Modelo actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Modelo a actualizar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const deleteModelo = async(req, res) => {
    const { modeloId } = req.params;
    try {
        const query = await Modelo.findByIdAndDelete(modeloId);
        if (query) {
            res.json({ message: 'Modelo eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Modelo a eliminar' });
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message })
    }
}

export const getCountAll = async (req, res) => {
    try {
        const query = await Modelo.find().countDocuments();
        if(query >= 0){
            res.json({total: query});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}

export const getModelsByMarca = async (req, res) => {
    const {marca} = req.body;

    try {
        const marcaFound = await Marca.findOne({name: marca});

        if(!marcaFound) return res.status(404).json({message: `Marca ${marca} no encontrada`});

        const query = await Modelo.find({marca: marcaFound._id}).sort({name: 1});

        if(query.length > 0){
            res.json({count: query.length, models: query});
        }else{
            return res.status(404).json({message: `Marca ${marca} no tiene modelos`});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({ message: err.message });
    }
}