import { Schema, model } from "mongoose";

const conversionSchema = new Schema({
    name: { type: String },
    status: { type: Boolean }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Conversion', conversionSchema)