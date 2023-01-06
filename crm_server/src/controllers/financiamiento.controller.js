import Financiamiento from '../models/Financiamiento';
import User from '../models/User';

const financesCtrl = {};

financesCtrl.getAll = async (req, res) => {
    try {
        const query = await Financiamiento.find()
            .sort({name: 1})
            .populate({
                path: 'createdBy',
                select: 'name username',
            });

            if(query.length > 0){
                res.json({total: query.length, all_finances: query});
            }else{
                return res.status(404).json({message: 'No existen Tipos de financiamiento'});
            }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

financesCtrl.getOneById = async (req, res) => {
    const {financesId} = req.params;

    try {
        const query = await Financiamiento.findById(financesId)
            .populate({
                path: 'createdBy',
                select: 'name username',
            });

            if(query){
                res.json({finance: query});
            }else{
                return res.status(404).json({message: 'No existen Tipos de financiamiento'});
            }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

financesCtrl.getActivos = async (req, res) => {
    try {
        const query = await Financiamiento.find({status: true})
            .populate({
                path: 'createdBy',
                select: 'name username',
            });

            if(query.length > 0){
                res.json({total_active: query.length, active_finances: query});
            }else{
                return res.status(404).json({message: 'No existen Tipos de financiamiento'});
            }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

financesCtrl.createOne = async (req, res) => {
    const { name, status, createdBy} = req.body;
    try {
        const newObj = new Financiamiento({name,status});

        const userFound = await User.findOne({username: createdBy});
        newObj.createdBy = userFound._id;

        const query = await newObj.save();

        if(query){
            res.json({message: 'Tipo de financiamiento agregado con éxito.'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

financesCtrl.updateOneById = async (req, res) =>{
    const {financesId} = req.params;
    const { name, status} = req.body;

    try {
        const query = await Financiamiento.findByIdAndUpdate(financesId,{
            name,
            status
        });

        if(query){
            res.json({message: 'Tipo de financiamiento actualizado con éxito'});
        }else{
            return res.status(404).json({message: 'No existe tipo de financiamiento para actualizar'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

financesCtrl.deleteOneById = async (req, res) =>{
    const {financesId} = req.params;

    try {
        const query = await Financiamiento.findByIdAndDelete(financesId);

        if(query){
            res.json({message: 'Tipo de financiamiento eliminado con éxito'});
        }else{
            return res.status(404).json({message: 'No existe tipo de financiamiento a eliminar'});
        }
    } catch (err) {
        console.log(err);
        return res.status(503).json({message: err});
    }
}

export default financesCtrl;