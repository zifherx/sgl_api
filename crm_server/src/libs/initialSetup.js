import Role from '../models/Role'
import User from '../models/User'

export const createRoles = async() => {
    try {
        const nroRoles = await Role.countDocuments();
        if (nroRoles > 0) return;

        const registros = await Promise.all([
            new Role({ name: 'Administrador', description: 'Webmaster de Sistema' }).save(),
            new Role({ name: 'Usuario', description: 'Usuario común' }).save(),
            new Role({ name: 'Asistente-Marketing', description: 'Alimenta la base de datos' }).save(),
            new Role({ name: 'Asistente-Digital', description: 'Gestiona leads para su conversión' }).save(),
        ])
        console.log('Roles creados:', registros)
    } catch (err) {
        console.error(err)
    }
}

export const createAdminUser = async() => {
    try {
        const nroUser = await User.countDocuments();
        if (nroUser > 0) return;

        const roleAdmin = await Role.findOne({ name: 'Administrador' });

        const registro = await Promise.all([
            new User({
                name: 'Fernando Rojas',
                username: 'frojasq',
                password: await User.encryptPassword('admin'),
                email: 'frojas@autonortnor.com.pe',
                description: 'Webmaster del Sistema',
                sucursal: 'Corporativo',
                roles: roleAdmin._id
            }).save()
        ])
        console.log('Usuario creado:', registro)
    } catch (err) {
        console.error(err)
    }
}