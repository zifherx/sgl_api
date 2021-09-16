import jwt from 'jsonwebtoken'
import index from '../config/index'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async(req, res, next) => {
    try {
        let requestHeader = 'x-access-token'
        const token = req.header(requestHeader)

        if (!token) return res.status(404).json({ message: 'Falta Token' })

        const decoded = jwt.verify(token, index.SECRET)
        res.locals.jwtPayload = decoded
        req.userId = decoded.id
        const id = req.userId

        const userFound = await User.findById(id, { password: 0 })

        if (!userFound) return res.status(404).json({ message: 'No se encontró usuario' })

        next()
    } catch (err) {
        console.error(err.message)
        if (err.message == "jwt expired") {
            return res.status(401).json({ message: 'Token ha expirado' });
        } else if (err.message == "invalid token") {
            return res.status(401).json({ message: 'Token inválido' })
        } else {
            return res.status(403).json({ message: 'No Autorizado' });
        }
    }
}

export const isAdmin = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Administrador') {
            next()
            return;
        }
    }
    return res.status(403).json({ message: 'Requiere permiso de Administrador' });
}

export const isVendedor = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Vendedor') {
            next()
            return;
        }
    }
    return res.status(403).json({ message: 'Requiere permiso de Vendedor' });
}

export const isAsistente_Marketing = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Asistente-Marketing') {
            next()
            return;
        }
    }
    return res.status(403).json({ message: 'Requiere permiso de Asistente-Marketing' });
}

export const isJefe_Ventas = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Jefe-Ventas') {
            next()
            return;
        }
    }
    return res.status(403).json({ message: 'Requiere permiso de Jefe-Ventas' });
}

export const isAsistente_Callcenter = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Asistente-Callcenter') {
            next()
            return;
        }
    }
    return res.status(403).json({ message: 'Requiere permiso de Asistente-Callcenter' });
}