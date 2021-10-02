import { Schema, model } from 'mongoose';

const complianceSchema = new Schema({
    asesor_venta: { ref: 'Seller', type: Schema.Types.ObjectId, default: null },
    nro_asignados: { type: Number, min: 0, default: 0 },
    nro_atendidos: { type: Number, min: 0, default: 0 },
    nro_vendidos: { type: Number, min: 0, default: 0 },
    meta_asignados: { type: Number, min: 0, default: 0 },
    meta_atendidos: { type: Number, min: 0, default: 0 },
    meta_vendidos: { type: Number, min: 0, default: 0 },
    sucursal: { type: String, uppercase: true, trim: true },
    fecha: { type: Date, default: Date.now },
    anio: { type: Number, min: 2020 },
    mes: { type: Number, min: 1, max: 12 },
    userCreator: { ref: 'User', type: Schema.Types.ObjectId }
}, {
    versionKey: false,
    timestamps: true
});

export default model('Compliance', complianceSchema)