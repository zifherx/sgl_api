import { Schema, model } from "mongoose";

const modeloSchema = new Schema({
    name: { type: String },
    status: { type: Boolean }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Modelo', modeloSchema)