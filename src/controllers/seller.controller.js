import Seller from "../models/Seller";
import User from "../models/User";

const sellerCtrl = {}

sellerCtrl.getAll = async(req, res) => {
    try {
        const query = await Seller.find().sort({ name: 'asc' }).populate('userCreator')

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Asesores de Ventas' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

sellerCtrl.getOne = async(req, res) => {
    const { sellerId } = req.params;
    try {
        const query = await Seller.findById(sellerId).populate('userCreator');
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existe el Asesor de Ventas' })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

sellerCtrl.createSeller = async(req, res) => {
    const { name, document, sucursal, userCreator } = req.body;
    try {
        const newSeller = new Seller({
            name,
            document,
            sucursal
        });

        const userFound = await User.find({ username: userCreator })
        newSeller.userCreator = userFound.map(a => a._id)

        const query = await newSeller.save();

        if (query) {
            res.json({ message: 'Asesor de Ventas creado con éxito' });
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

sellerCtrl.updateSeller = async(req, res) => {
    const { sellerId } = req.params;
    const { name, document, sucursal, status } = req.body;
    try {

        const query = await Seller.findByIdAndUpdate(sellerId, {
            name,
            document,
            sucursal,
            status
        });
        if (query) {
            res.json({ message: 'Asesor de Ventas actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Asesor de Ventas no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

sellerCtrl.deleteSeller = async(req, res) => {
    const { sellerId } = req.params;
    try {
        const query = await Seller.findByIdAndRemove(sellerId);

        if (query) {
            res.json({ message: 'Asesor de Ventas eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Asesor de Ventas no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

sellerCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Seller.estimatedDocumentCount()

        if (query >= 0) {
            res.json({ nro_seller: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

sellerCtrl.getSellersByActive = async(req, res) => {
    try {
        const query = await Seller.find({ status: true }).sort({ name: 'asc' });
        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Asesores de Ventas Activos' })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

sellerCtrl.getSellersBySucursal = async(req, res) => {
    const { sucursal_seller } = req.body;
    try {
        const query = await Seller.find({ sucursal: sucursal_seller }).sort({ name: 'asc' });
        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: `No existen Asesores de Ventas en ${sucursal_seller}` })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default sellerCtrl