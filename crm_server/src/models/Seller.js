import { Schema, model } from "mongoose"

const sellerSchema = new Schema({
    name: { type: String },
    document: { type: String },
    cellphone: { type: String },
    email: { type: String },
    tipo: { type: String },
    marca: { type: Schema.Types.ObjectId, ref: 'Marca' },
    sucursal: { type: Schema.Types.ObjectId, ref: 'Sucursal' },
    avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' },
    status: { type: Boolean, default: true },
    createdBy: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Seller', sellerSchema)