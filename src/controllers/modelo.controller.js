import Modelo from "../models/Modelo";

export const getModelos = async(req, res) => {
    try {
        const modelos = await Modelo.find().sort({ name: 'asc' });
        if (modelos.length > 0) {
            res.json(modelos);
        } else {
            res.status(404).json({ message: 'No existen Modelos' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message });
    }
}

export const getModeloById = async(req, res) => {
    const { modeloId } = req.params;
    try {
        const modelos = await Modelo.findById(modeloId);
        if (modelos) {
            res.json(modelos);
        } else {
            return res.status(404).json({ message: 'No existe el Modelo' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message });
    }
}

export const getModeloByActivo = async(req, res) => {
    try {
        const modelos = await Modelo.find({ status: true }).sort({ name: 'asc' });
        if (modelos.length > 0) {
            res.json(modelos);
        } else {
            return res.status(404).json({ message: 'No existen Modelos Activos' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message });
    }
}

export const createModelo = async(req, res) => {
    const { name, status } = req.body;
    try {
        const newModelo = new Modelo({ name, status });
        const modeloCreado = await newModelo.save();
        if (modeloCreado) {
            res.json({ message: 'Modelo creado con éxito' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const updateModelo = async(req, res) => {
    const { name, status } = req.body;
    const { modeloId } = req.params;
    try {
        const updateModelo = await Modelo.findByIdAndUpdate(modeloId, { name, status });
        if (updateModelo) {
            res.json({ message: 'Modelo actualizado con éxito' });
        } else {
            res.status(404).json({ message: 'No existe Modelo a actualizar' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const deleteModelo = async(req, res) => {
    const { modeloId } = req.params;
    try {
        const deleteModelo = await Modelo.findByIdAndDelete(modeloId);
        if (deleteModelo) {
            res.json({ message: 'Modelo eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Modelo a eliminar' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}