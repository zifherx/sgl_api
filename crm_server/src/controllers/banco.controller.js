import Banco from '../models/Banco';
import User from '../models/User';

const bancoCtrl = {};

bancoCtrl.getAll = async (req, res) => {
    try {
        const query = await Banco.find()
        .sort({name: 1})
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if(query.length > 0){
            res.json({total: query.length ,entidades: query});
        }else{
            return res.status(404).json({message: 'No existen Entidades Bancarias'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err.message});
    }
}

bancoCtrl.getOneById = async (req, res) => {
    const {bancoId} = req.params;
    try {
        const query = await Banco.findById(bancoId)
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if(query){
            res.json({entidad: query});
        }else{
            return res.status(404).json({message: 'No existen Entidad Bancaria'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err.message});
    }
}

bancoCtrl.getAllByStatus  = async (req, res) => {
    try {
        const query = await Banco.find({status: true})
        .populate({
            path: 'createdBy',
            select: 'name username'
        });

        if(query.length > 0){
            res.json({total: query.length ,entidades_activas: query});
        }else{
            return res.status(404).json({message: 'No existen Entidad Bancaria'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err.message});
    }
}

bancoCtrl.createOne = async (req, res) => {
    const {name, status, createdBy} = req.body;
    const avatar = req.file;
    try {

        let obj = null;
        const userFound = await User.findOne({username: createdBy});
        if(!userFound) return res.status(404).json({message: 'No existe usuario'});

        if(avatar == undefined || avatar == null){
            obj = new Banco({name, status});
            obj.createdBy = userFound._id;
        }else{
            obj = new Banco({
                name, status, avatar: avatar.location
            })
            obj.createdBy = userFound._id;
        }

        const query = await obj.save();

        if(query){
            res.json({message: 'Banco creado con éxito'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err});
    }
}

bancoCtrl.updateOneById = async (req, res) => {
    const {bancoId} = req.params;
    const { name, status } = req.body;
    const avatar = req.file;
    try {
        let query = null;

        if(avatar == undefined || avatar == null){
            query = await Banco.findByIdAndUpdate(bancoId,{name,status});
        }else{
            query = await Banco.findByIdAndUpdate(bancoId,{
                name,
                status,
                avatar: avatar.location
            });
        }

        if(query){
            res.json({message: 'Entidad Bancaria actualizada con éxito'});
        }else{
            return res.status(404).json({message: 'Entidad Bancaria no encontrada'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err.message});
    }
}

bancoCtrl.deleteOneById = async (req, res) => {
    const {bancoId} = req.params;
    try {
        const query = await Banco.findByIdAndDelete(bancoId);

        if(query){
            res.json({message: 'Entidad Bancaria eliminada con éxito'});
        }else{
            return res.status(404).json({message: 'No existen Entidad Bancaria'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({error: err.message});
    }
}

export default bancoCtrl;