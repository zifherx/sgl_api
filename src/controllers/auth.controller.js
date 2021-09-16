import jwt from 'jsonwebtoken'
import index from '../config'
import User from '../models/User'

const authCtrl = {}

authCtrl.iniciarSesion = async(req, res) => {
    const { username, password } = req.body

    const userFound = await User.findOne({ username })

    if (!userFound) return res.status(404).json({ message: 'Usuario no existe' })

    if (!userFound.status) return res.status(403).json({ message: 'Usuario Inactivo' })

    if (userFound.online === 1) return res.status(401).json({ message: 'Usuario ya se encuentra logueado' })

    const matchPassword = await User.matchPassword(password, userFound.password)

    if (!matchPassword) return res.status(403).json({ token: null, message: 'Contraseña Errónea' })

    const token = jwt.sign({ id: userFound._id }, index.SECRET, { expiresIn: '24h' })

    //Cambio de estado a online
    const online = await User.findByIdAndUpdate(userFound._id, { online: 1 })
    console.log('Token:', token)

    res.json({ token, codigoUser: userFound._id })
}

authCtrl.cambiarContrasena = async(req, res) => {
    const { id } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) return res.status(409).json({ message: 'Contraseñas no coinciden' })

    const userFound = await User.findById(id);

    if (!userFound) return res.status(404).json({ message: 'Usuario no existe' })

    const matchPassword = await User.matchPassword(oldPassword, userFound.password);
    if (!matchPassword) return res.status(409).json({ token: null, message: 'Contraseña Errónea' })

    userFound.password = await User.encryptPassword(newPassword);
    const newObj = await userFound.save();
    try {
        if (newObj) return res.json({ message: 'Contraseña actualizada con éxito' })
    } catch (err) {
        console.log(err)
        return res.status(503).json({ message: err.message })
    }
}

authCtrl.cerrarSesion = async(req, res) => {
    const { id } = res.locals.jwtPayload

    try {

        const userFound = await User.findById(id)

        if (userFound.online === 0) return res.status(401).json({ message: 'No existe sesión abierta' })

        const offline = await User.findByIdAndUpdate(id, { online: 0 })

        if (offline) return res.json({ message: 'Sesión cerrada con éxito' })
    } catch (err) {
        return res.status(503).json({ message: err.message })
    }
}

authCtrl.forzarCierreSesion = async(req, res) => {
    const { username } = req.body

    try {
        const userFound = await User.findOne({ username })
            // console.log(userFound)
        const idUser = userFound._id
        console.log(idUser)

        if (!userFound) return res.status(404).json({ message: 'Usuario no existe' })

        if (userFound.online === 0) return res.status(401).json({ message: 'No existe sesión iniciada' })

        const offline = await User.findByIdAndUpdate(idUser, { online: 0 })

        // console.log(offline)

        if (offline) return res.json({ message: 'Se forzó el cierre de sesión' })

    } catch (err) {
        return res.status(503).json({ message: err.message })
    }

}

export default authCtrl