import EstadoConversion from "../models/EstadoConversion";
import User from "../models/User";

const conversionCtrl = {};

conversionCtrl.getAll = async (req, res) => {
    try {
        const query = await EstadoConversion.find()
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if(query.length > 0) {
            res.json({total: query.length, all_status: query});
        }else{
            return res.status(404).json({message: 'No existen estados'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
};

conversionCtrl. getActivos = async (req, res) => {
    try {
        const query = await EstadoConversion.find({status: true})
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if(query.length > 0) {
            res.json({total_active: query.length, active_status: query});
        }else{
            return res.status(404).json({message: 'No existen estados activos'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
    
};

conversionCtrl.getOneById = async (req, res) => {
    const {conversionId} = req.params;
    try {
        const query = await EstadoConversion.findById(conversionId)
        .populate({
            path: 'createdBy',
            select: 'name username',
        });

        if(query){
            res.json({status: query});
        }else{
            return res.status(404).json({ message: 'No se encontró el estado'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
};

conversionCtrl.createOne = async (req, res) => {
    const {name, value,  status, createdBy} = req.body;
    try {
        
        const userFound = await User.findOne({username: createdBy});
        if(!userFound) return res.status(404).json({message: `Colaborador ${createdBy} no encontrado`})

        const newObj = new EstadoConversion({name,value, status});
        newObj.createdBy = userFound._id;

        const query = await newObj.save();

        if(query){
            res.json({message: 'Estado creado con éxito'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
    
};

conversionCtrl.updateOneById = async (req, res) => {
    const {conversionId} = req.params;
    const {name,value, status} = req.body;
    try {
        const query = await EstadoConversion.findByIdAndUpdate(conversionId,{ name,value, status});
        
        if(query){
            res.json({message: 'Estado actualizado con éxito'});
        }else{
            return res.status(404).json({message: 'No se encontró el estado a actualizar'})
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
};

conversionCtrl.deleteOneById = async (req, res) => {
    const {conversionId} = req.params;
    try {
        const query = await EstadoConversion.findByIdAndDelete(conversionId);

        if(query){
            res.json({message: 'Estado eliminado con éxito'});
        }else{
            return res.status(404).json({message: 'No se encontró el estado a eliminar'})
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err.message})
    }
};

export default conversionCtrl;