import Marca from "../models/Marca";

export const getAll = async(req, res) => {
    try {
        const query = await Marca.find().sort({ name: 'asc' });
        if (query.length > 0) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existen Marcas' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const getMarcaById = async(req, res) => {
    const { marcaId } = req.params;
    try {
        const query = await Marca.findById(marcaId);
        if (query) {
            res.json(query);
        } else {
            return res.status(404).json({ message: 'No existe Marca' })
        }
    } catch (err) {
        console.log(err)
        res.status(503).json({ message: err.message })
    }
}

export const getMarcaByActivo = async(req, res) => {
    try {
        const query = await Marca.find({ status: true }).sort({ name: 'asc' });
        if (query.length > 0) {
            res.json(query);
        } else {
            res.status(404).json({ message: 'No existen Marcas Activas' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message });
    }
}

export const createMarca = async(req, res) => {
    const { name, status } = req.body;
    try {
        const newMarca = new Marca({ name, status });

        const query = await newMarca.save();

        if (query) {
            res.json({ message: 'Marca creada con éxito' })
        }
    } catch (err) {
        console.log(err)
        res.status(503).json({ message: err.message })
    }
}

export const updateMarca = async(req, res) => {
    const { name, status } = req.body;
    const { marcaId } = req.params;
    try {
        const updateMarca = await Marca.findByIdAndUpdate(marcaId, { name, status });

        if (updateMarca) {
            res.json({ message: 'Marca actualizada con éxito' });
        } else {
            res.status(404).json({ message: 'No existe Marca a eliminar' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const deleteMarca = async(req, res) => {
    const { marcaId } = req.params;
    try {
        const deleteMarca = await Marca.findByIdAndDelete(marcaId);
        if (deleteMarca) {
            res.json({ message: 'Marca eliminada con éxito' });
        } else {
            return res.status(404).json({ message: 'No existe Marca a eliminar' });
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}