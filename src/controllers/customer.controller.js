import Customer from "../models/Customer";
import User from "../models/User";

const customerCtrl = {}

customerCtrl.getAll = async(req, res) => {
    try {
        const query = await Customer.find().sort({ name: 'asc' }).populate('userCreator')

        if (query.length > 0) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existen Clientes' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

customerCtrl.getOne = async(req, res) => {
    const { customerId } = req.params;
    try {
        const query = await Customer.findById(customerId).populate('userCreator');
        if (query) {
            res.json(query)
        } else {
            return res.status(404).json({ message: 'No existe el Cliente' })
        }

    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message })
    }
}

customerCtrl.createCustomer = async(req, res) => {
    const { name, document, address, city, cellphone, email, userCreator } = req.body;
    try {
        const newCustomer = new Customer({
            name,
            document,
            address,
            city,
            cellphone,
            email
        });

        const userFound = await User.find({ name: userCreator })
        newCustomer.userCreator = userFound.map(a => a._id)

        const query = await newCustomer.save();

        if (query) {
            res.json({ message: 'Cliente creado con éxito' });
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

customerCtrl.updateCustomer = async(req, res) => {
    const { customerId } = req.params;
    const { name, document, address, city, cellphone, email } = req.body;
    try {
        const query = await Customer.findByIdAndUpdate(customerId, {
            name,
            document,
            address,
            city,
            cellphone,
            email
        });
        if (query) {
            res.json({ message: 'Cliente actualizado con éxito' });
        } else {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

customerCtrl.deleteCustomer = async(req, res) => {
    const { customerId } = req.params;
    try {
        const query = await Customer.findByIdAndRemove(customerId);

        if (query) {
            res.json({ message: 'Cliente eliminado con éxito' });
        } else {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: err.message });
    }
}

customerCtrl.getCountAll = async(req, res) => {
    try {
        const query = await Customer.estimatedDocumentCount()

        if (query >= 0) {
            res.json({ nro_customer: query })
        }
    } catch (err) {
        console.error(err)
        return res.status(503).json({ message: err.message })
    }
}

export default customerCtrl