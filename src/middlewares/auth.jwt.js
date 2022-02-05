import jwt from 'jsonwebtoken'
import index from '../config/index'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) return res.status(409).json({ message: 'Falta Token' })

        const decoded = jwt.verify(token, index.SECRET)
        res.locals.jwtPayload = decoded;
        req.userId = decoded.id;
        const id = req.userId;

        const userFound = await User.findById(id, { password: 0 });

        if (!userFound) return res.status(404).json({ message: 'No se encontró usuario' })

        next()
    } catch (err) {
        console.log(err)
        if (err.message == "jwt expired") {
            return res.status(400).json({ message: 'Token ha expirado' });
        } else if (err.message == "invalid token") {
            return res.status(409).json({ message: 'Token inválido' })
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
    return res.status(401).json({ message: 'Requiere permiso de Administrador' });
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
    return res.status(401).json({ message: 'Requiere permiso de Asistente-Marketing' });
}

export const isMarketingyCallCenteryAdmin = async(req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Asistente-Marketing' || roles[i].name === 'Asistente-Callcenter' || roles[i].name === 'Administrador') {
            next()
            return;
        }
    }
    return res.status(401).json({ message: 'Requiere permiso de Asistente-Marketing || Asistente-Callcenter' });
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
    return res.status(401).json({ message: 'Requiere permiso de Jefe-Ventas' });
}

export const isAsistente_CallcenterYAdmin = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Asistente-Callcenter' || roles[i].name === 'Administrador') {
            next()
            return;
        }
    }
    return res.status(401).json({ message: 'Requiere permiso de Asistente-Callcenter || Administrador' });
}

export const isAsistente_CallCenterAdminDigital = async(req, res, next) => {

    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'Asistente-Callcenter' || roles[i].name === 'Asistente-Marketing' || roles[i].name === 'Administrador' || roles[i].name === 'Asistente-Digital') {
            next()
            return;
        }
    }
    return res.status(401).json({ message: 'Requiere permiso de Asistente-Callcenter || Asistente-Marketing || Administrador || Asistente-Digital' });
}