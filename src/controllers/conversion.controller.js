import Conversion from '../models/Conversion'

export const getAll = async(req, res) => {
    try {
        const objeto = await Conversion.find().sort({ name: 'asc' })
        if (objeto.length > 0) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existen estados de conversión' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const getConversionById = async(req, res) => {
    const { conversionId } = req.params
    try {
        const objeto = await Conversion.findById(conversionId)
        if (objeto) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existe estado de conversión' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const getConversionByActivo = async(req, res) => {
    try {
        const objeto = await Conversion.find({ status: true }).sort({ name: 'asc' })
        if (objeto.length > 0) {
            res.json(objeto);
        } else {
            return res.status(404).json({ message: 'No existen estados de conversión Activos' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const createConversion = async(req, res) => {
    const { name, status } = req.body;
    try {
        const nuevo = new Conversion({ name, status })
        const objeto = await nuevo.save()
        if (objeto) {
            res.json({ message: 'Estado de conversión creada con éxito' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const updateConversion = async(req, res) => {
    const { name, status } = req.body;
    const { conversionId } = req.params;
    try {
        const objeto = await Conversion.findByIdAndUpdate(conversionId, { name, status })
        if (objeto) {
            res.json({ message: 'Estado de conversion actualizada con éxito' })
        } else {
            res.status(404).json({ message: 'No existe estado de conversión a actualizar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}

export const deleteConversion = async(req, res) => {
    const { conversionId } = req.params;
    try {
        const objeto = await Conversion.findByIdAndDelete(conversionId)
        if (objeto) {
            res.json({ message: 'Estado de conversión eliminada con éxito' })
        } else {
            return res.status(404).json({ message: 'No existe estado de conversión a eliminar' })
        }
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: err.message })
    }
}