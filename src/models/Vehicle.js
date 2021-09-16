import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
    marca: { type: String },
    cod_tdp: { type: String, unique: true },
    categoria: { type: String },
    modelo: { type: String },
    version: { type: String },
    userCreator: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Vehicle', vehicleSchema)