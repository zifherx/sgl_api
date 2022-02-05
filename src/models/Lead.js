import { Schema, model } from "mongoose";

const leadSchema = new Schema({
    //Solicitud Lead
    sucursal_lead: { type: Schema.Types.ObjectId, ref: 'Sucursal' },
    dataOrigin: { type: Schema.Types.ObjectId, ref: 'OriginData' },
    motivo_rechazo: { type: String },
    motivo_desistencia: { type: String },
    comentario: { type: String },
    observacion: { type: String },
    // Financiamiento
    tipoFinanciamiento: { type: Schema.Types.ObjectId, ref: 'Financiamiento'},
    entidad_bancaria: { type: Schema.Types.ObjectId, ref: 'Banco', default: null },
    tentativa_inicial: { type: Number, default: 0},
    precioUnidad: { type: Number, default: 0 },
    //Cliente
    customer_name: { type: String },
    customer_document: { type: String, min: 8, max: 11 },
    customer_city: { type: String },
    customer_cellphone: { type: String },
    customer_cellphone2: { type: String },
    customer_email: { type: String },
    // Estatus
    estado_lead: { type: String, default: 'INGRESADO' },
    estado_conversion: { type: Schema.Types.ObjectId, ref: 'EstadoConversion', default: null },
    //Verificaciones de Leads
    isIngresado: { type: Boolean, default: true },
    isNoInteresado: { type: Boolean, default: false },
    isAtendido: { type: Boolean, default: false },
    isAsignado: { type: Boolean, default: false },
    isCotizado: { type: Boolean, default: false },
    isDeclinado: { type: Boolean, default: false },
    isConvertido: { type: Boolean, default: false },
    isBooking: { type: Boolean, default: false},
    isDown: { type: Boolean, default: false},
    isVenta: { type: Boolean, default: false},
    //Fechas
    fecha_ingreso: { type: Date },
    fecha_noInteresado: { type: Date },
    fecha_atencion: { type: Date },
    fecha_asignacion: { type: Date },
    fecha_cotizacion: { type: Date },
    fecha_declinado: { type: Date },
    fecha_conversion: { type: Date },
    fecha_booking: {type: Date},
    fecha_down: {type: Date},
    fecha_venta: {type: Date},
    //Vehiculo
    auto: { type: Schema.Types.ObjectId, ref: 'Vehicle', default: null},
    //Asesor Asignado
    asesorAsignado: { ref: 'Seller', type: Schema.Types.ObjectId, default: null },
    //Creador Lead
    createdBy: { ref: 'User', type: Schema.Types.ObjectId, },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Lead', leadSchema);