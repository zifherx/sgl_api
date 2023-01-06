import { Schema, model } from 'mongoose'

const roleSchema = new Schema({
    tipoPermiso: { type: String },
    description: { type: String },
    accesoModulos: [{type: String}],
    status: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Role', roleSchema)