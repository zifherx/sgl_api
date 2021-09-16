import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name: { type: String },
    document: { type: String },
    address: { type: String },
    city: { type: String },
    cellphone: { type: String },
    email: { type: String },
    userCreator: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Customer', customerSchema)