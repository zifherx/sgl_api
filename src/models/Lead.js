import { Schema, model } from "mongoose";

const leadSchema = new Schema({
    sucursal_lead: { type: String },
    dataOrigin: { type: String },
    statusLead: { type: Boolean, default: false },
    customer_name: { type: String },
    customer_document: { type: String },
    customer_address: { type: String },
    customer_city: { type: String },
    customer_cellphone: { type: String },
    customer_email: { type: String },
    // customer: { ref: 'Customer', type: Schema.Types.ObjectId },
    //JEFE
    status_asignado: { type: Boolean, default: false },
    fecha_asignacion: { type: Date },
    //Cotizacion
    modeloVehiculo: { type: String },
    versionVehiculo: { type: String },
    asesorVenta: { ref: 'Seller', type: Schema.Types.ObjectId, default: null },
    fecha_ingreso: { type: Date },
    fecha_atencion: { type: Date },
    comentario: { type: String },
    tipo_pago: { type: String },
    valorUnidad: { type: Number },
    tipo_financiamiento: { type: String },
    //Creador
    userCreator: { ref: 'User', type: Schema.Types.ObjectId, },
    jefeAsignador: { ref: 'User', type: Schema.Types.ObjectId, default: null },
    asesorAtencion: { ref: 'User', type: Schema.Types.ObjectId, default: null },
    //Estado Global Venta
    lead_convertido: { type: Boolean, default: false },
    estatus_venta: { type: String, default: 'EN SEGUIMIENTO' }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Lead', leadSchema)