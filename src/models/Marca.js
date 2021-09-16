import { Schema, model } from "mongoose";

const marcaSchema = new Schema({
    name: { type: String },
    status: { type: Boolean }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Marca', marcaSchema)