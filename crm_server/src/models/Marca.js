import { Schema, model } from "mongoose";

const marcaSchema = new Schema({
    name: { type: String },
    avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' },
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    versionKey: false,
    timestamps: true
})

export default model('Marca', marcaSchema)