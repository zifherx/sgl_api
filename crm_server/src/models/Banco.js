import { Schema, model } from 'mongoose'

const bancoSchema = new Schema({
    name: { type: String },
    avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' },
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
    versionKey: false
});

export default model('Banco', bancoSchema);