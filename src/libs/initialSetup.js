import Role from '../models/Role'
import User from '../models/User'

export const createRoles = async() => {
    try {
        const nroRoles = await Role.estimatedDocumentCount();
        // console.log(nroRoles)
        if (nroRoles > 0) return;

        const registros = await Promise.all([
            new Role({ name: 'Administrador', description: 'Webmaster de Sistema', status: true }).save(),
            new Role({ name: 'Usuario', description: 'Usuario común', status: true }).save()
        ])
        console.log('Roles creados:', registros)
    } catch (err) {
        console.error(err)
    }
}

export const createAdminUser = async() => {
    try {
        const nroUser = await User.estimatedDocumentCount();
        // console.log(nroUser)

        const roleAdmin = await Role.find({ name: 'Administrador' })
        let idRol = roleAdmin.map(a => a._id)

        if (nroUser > 0) return;

        const registro = await Promise.all([
            new User({
                name: 'Fernando Rojas',
                username: 'frojasq',
                password: await User.encryptPassword('admin'),
                email: 'frojas@autonortnor.com.pe',
                description: 'Webmaster del Sistema',
                sucursal: 'Trujillo',
                roles: idRol
            }).save()
        ])
        console.log('Usuario creado:', registro)
    } catch (err) {
        console.error(err)
    }
}