import { Schema, model } from 'mongoose'

const roleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    status: { type: Boolean },
    userCreator: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Role', roleSchema)