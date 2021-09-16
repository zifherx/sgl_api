import { Schema, model } from "mongoose";

const sucursalSchema = new Schema({
    name: { type: String },
    status: { type: Boolean }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Sucursal', sucursalSchema)