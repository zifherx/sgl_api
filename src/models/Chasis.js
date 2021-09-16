import { Schema, model } from "mongoose";

const chasisSchema = new Schema({
    name: { type: String },
    status: { type: Boolean }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Chasis', chasisSchema)