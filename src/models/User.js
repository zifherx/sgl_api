import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String },
    cellphone: { type: String },
    description: { type: String },
    avatar: { type: String },
    status: { type: Boolean, default: true },
    online: { type: Boolean, default: false },
    sucursal: { type: Schema.Types.ObjectId, ref: 'Sucursal' },
    roles: [{ ref: 'Role', type: Schema.Types.ObjectId }],
    createdBy: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async(clave) => {
    const salto = await bcrypt.genSalt(10)
    return await bcrypt.hash(clave, salto)
}

userSchema.statics.matchPassword = async(clave, claveRecibida) => {
    return await bcrypt.compare(clave, claveRecibida)
}

export default model('User', userSchema)