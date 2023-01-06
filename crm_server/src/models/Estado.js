import { Schema, model } from 'mongoose'

const estadoSchema = new Schema({
    name: { type: String },
    value: { type: Number},
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Estado', estadoSchema);