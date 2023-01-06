import { Schema, model } from "mongoose";

const citySchema = new Schema({
    name: { type: String },
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    versionKey: false,
    timestamps: true
})

export default model('City', citySchema)