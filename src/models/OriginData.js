import { Schema, model } from "mongoose";

const originSchema = new Schema({
    name: { type: String },
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    versionKey: false,
    timestamps: true
})

export default model('OriginData', originSchema);