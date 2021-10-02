import { Schema, model } from "mongoose"

const sellerSchema = new Schema({
    name: { type: String },
    document: { type: String },
    sucursal: { type: String },
    rutaPerfil: { type: String },
    titlePerfil: { type: String },
    status: { type: Boolean, default: true },
    userCreator: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Seller', sellerSchema)