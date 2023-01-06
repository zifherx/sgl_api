import Lead from "../models/Lead";
import User from "../models/User";
import Sucursal from "../models/Sucursal";
import OriginData from "../models/OriginData";
import Vehicle from "../models/Vehicle";
import Financiamiento from "../models/Financiamiento";
import Banco from "../models/Banco";
import Seller from "../models/Seller";
import EstadoConversion from "../models/EstadoConversion";
import MotivoRechazo from "../models/MotivoRechazo";
import Marca from "../models/Marca";

const leadCtrl = {};

leadCtrl.getAll = async (req, res) => {
     try {
          const query = await Lead.find()
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "motivoDesplegable",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });

          if (query.length > 0) {
               res.json({ total: query.length, all_leads: query });
          } else {
               return res.status(404).json({ message: "No existen leads" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.getOneById = async (req, res) => {
     const { leadId } = req.params;
     try {
          const query = await Lead.findById(leadId)
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "name",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "motivoDesplegable",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar sucursal",
                    populate: [
                         {
                              path: "marca",
                              select: "name avatar",
                         },
                         {
                              path: "sucursal",
                              select: "name",
                         },
                    ],
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });

          if (query) {
               res.json({ one: query });
          } else {
               return res.status(404).json({ message: "No existen el lead" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.createOne = async (req, res) => {
     const { codigo_interno, dataOrigin, marcaVehiculo, marcaVehiculoE,customer_name, customer_document, customer_city, customer_cellphone, customer_cellphone2, customer_email, fecha_ingreso, createdBy } = req.body;

     try {
          const newObj = new Lead({
               codigo_interno,
               marcaVehiculo,
               customer_name,
               customer_document,
               customer_city,
               customer_cellphone,
               customer_cellphone2,
               customer_email,
               fecha_ingreso,
          });

          const originFound = await OriginData.findOne({ name: dataOrigin });
          if (!originFound) return res.status(404).json({ message: `Origen ${dataOrigin} no encontrada` });
          newObj.dataOrigin = originFound._id;

          const marcaFound = await Marca.findOne({name: marcaVehiculoE });
          if(!marcaFound) return res.status(404).json({message: `Marca ${marcaVehiculoE} no encontrada`});
          newObj.marcaVehiculoE = marcaFound._id;

          const userFound = await User.findOne({ username: createdBy });
          if (!userFound) return res.status(404).json({ message: `Empleado ${createdBy} no encontrado` });
          newObj.createdBy = userFound._id;

          const query = await newObj.save();

          if (query) {
               res.json({ message: "Lead creado con éxito" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isNoInteresado = async (req, res) => {
     const { leadId } = req.params;
     const { estado_lead, isNoInteresado, sucursal, fecha_noInteresado, motivoDesplegable, motivo_rechazo } = req.body;

     try {
          const sucursalFound = await Sucursal.findOne({ name: sucursal });
          if (!sucursalFound) return res.status(404).json({ message: `Sucursal ${sucursal} no encontrada` });

          const motivoFound = await MotivoRechazo.findOne({ name: motivoDesplegable });
          if (!motivoFound) return res.status(404).json({ message: `Motivo ${motivoDesplegable} no encontrado` });

          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_lead,
               isNoInteresado,
               sucursal_lead: sucursalFound._id,
               fecha_noInteresado,
               motivoDesplegable: motivoFound._id,
               motivo_rechazo,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isAtendido = async (req, res) => {
     const { leadId } = req.params;
     const { estado_lead, isAtendido, fecha_atencion, comentario, observacion, sucursal, auto, financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad } = req.body;

     try {
          let query = null;

          const sucursalFound = await Sucursal.findOne({ name: sucursal });
          const autoFound = await Vehicle.findOne({ cod_tdp: auto });
          const financiamientoFound = await Financiamiento.findOne({ name: financiamiento });

          if (!sucursalFound) return res.status(404).json({ message: `Sucursal ${sucursal} no encontrada` });
          if (!autoFound) return res.status(404).json({ message: `Vehículo ${auto} no encontrado` });
          if (!financiamientoFound) return res.status(404).json({ message: `Tipo de financiamiento ${financiamiento} no encontrado` });

          if (entidad_bancaria == null || entidad_bancaria == undefined) {
               query = await Lead.findByIdAndUpdate(leadId, {
                    sucursal_lead: sucursalFound._id,
                    estado_lead,
                    isAtendido,
                    fecha_atencion,
                    comentario,
                    observacion,
                    auto: autoFound._id,
                    tipoFinanciamiento: financiamientoFound._id,
                    tentativa_inicial,
                    precioUnidad,
               });
          } else {
               const bancoFound = await Banco.findOne({ name: entidad_bancaria });
               if (!bancoFound) return res.status(404).json({ message: `Entidad ${entidad_bancaria} no encontrado` });

               query = await Lead.findByIdAndUpdate(leadId, {
                    sucursal_lead: sucursalFound._id,
                    estado_lead,
                    isAtendido,
                    fecha_atencion,
                    comentario,
                    observacion,
                    auto: autoFound._id,
                    tipoFinanciamiento: financiamientoFound._id,
                    entidad_bancaria: bancoFound._id,
                    tentativa_inicial,
                    precioUnidad,
               });
          }

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isAsignacion = async (req, res) => {
     const { leadId } = req.params;
     const { estado_lead, isAsignado, fecha_asignacion, comentario, observacion, sucursal, asesorAsignado, auto, financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad } = req.body;

     try {
          let query = null;

          const sucursalFound = await Sucursal.findOne({ name: sucursal });
          const asesorFound = await Seller.findOne({ name: asesorAsignado });
          const autoFound = await Vehicle.findOne({ cod_tdp: auto });
          const financiamientoFound = await Financiamiento.findOne({ name: financiamiento });

          if (!sucursalFound) return res.status(404).json({ message: `Sucursal ${sucursal} no encontrada` });
          if (!asesorFound) return res.status(404).json({ message: `Asesor ${asesorAsignado} no encontrado` });
          if (!autoFound) return res.status(404).json({ message: `Vehículo ${auto} no encontrado` });
          if (!financiamientoFound) return res.status(404).json({ message: `Tipo de financiamiento ${financiamiento} no encontrado` });

          if (entidad_bancaria == null || entidad_bancaria == undefined) {
               query = await Lead.findByIdAndUpdate(leadId, {
                    sucursal_lead: sucursalFound._id,
                    estado_lead,
                    isAsignado,
                    fecha_asignacion,
                    comentario,
                    observacion,
                    asesorAsignado: asesorFound._id,
                    auto: autoFound._id,
                    tipoFinanciamiento: financiamientoFound._id,
                    tentativa_inicial,
                    precioUnidad,
               });
          } else {
               const bancoFound = await Banco.findOne({ name: entidad_bancaria });
               if (!bancoFound) return res.status(404).json({ message: `Entidad ${entidad_bancaria} no encontrado` });

               query = await Lead.findByIdAndUpdate(leadId, {
                    sucursal_lead: sucursalFound._id,
                    estado_lead,
                    isAsignado,
                    fecha_asignacion,
                    comentario,
                    observacion,
                    asesorAsignado: asesorFound._id,
                    auto: autoFound._id,
                    tipoFinanciamiento: financiamientoFound._id,
                    entidad_bancaria: bancoFound._id,
                    tentativa_inicial,
                    precioUnidad,
               });
          }

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isCotizado = async (req, res) => {
     const { leadId } = req.params;
     const { financiamiento, entidad_bancaria, tentativa_inicial, precioUnidad, estado_lead, isCotizado, fecha_cotizacion, comentario, observacion } = req.body;

     try {
          let query = null;

          const financiamientoFound = await Financiamiento.findOne({ name: financiamiento });
          if (!financiamientoFound) return res.status(404).json({ message: `Tipo de financiamiento ${financiamiento} no encontrado` });

          if (entidad_bancaria == null || entidad_bancaria == undefined) {
               query = await Lead.findByIdAndUpdate(leadId, {
                    tipoFinanciamiento: financiamientoFound._id,
                    tentativa_inicial,
                    precioUnidad,
                    estado_lead,
                    isCotizado,
                    fecha_cotizacion,
                    comentario,
                    observacion,
               });
          } else {
               const bancoFound = await Banco.findOne({ name: entidad_bancaria });
               if (!bancoFound) return res.status(404).json({ message: `Entidad ${entidad_bancaria} no encontrado` });

               query = await Lead.findByIdAndUpdate(leadId, {
                    tipoFinanciamiento: financiamientoFound._id,
                    entidad_bancaria: bancoFound._id,
                    tentativa_inicial,
                    precioUnidad,
                    estado_lead,
                    isCotizado,
                    fecha_cotizacion,
                    comentario,
                    observacion,
               });
          }

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isDeclinado = async (req, res) => {
     const { leadId } = req.params;
     const { estado_lead, isDeclinado, fecha_declinado, motivo_desistencia, comentario, observacion } = req.body;

     try {
          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_lead,
               isDeclinado,
               fecha_declinado,
               motivo_desistencia,
               comentario,
               observacion,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isConvertido = async (req, res) => {
     const { leadId } = req.params;
     const { estado_lead, estado_conversion, isConvertido, fecha_conversion } = req.body;

     try {
          const statusFound = await EstadoConversion.findOne({ name: estado_conversion });
          if (!statusFound) return res.status(404).json({ message: `Estado ${estado_conversion} no encontrado` });

          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_lead,
               estado_conversion: statusFound._id,
               isConvertido,
               fecha_conversion,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isBooking = async (req, res) => {
     const { leadId } = req.params;
     const { estado_conversion, isBooking, fecha_booking } = req.body;

     try {
          const statusFound = await EstadoConversion.findOne({ name: estado_conversion });
          if (!statusFound) return res.status(404).json({ message: `Estado ${estado_conversion} no encontrado` });

          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_conversion: statusFound._id,
               isBooking,
               fecha_booking,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isDown = async (req, res) => {
     const { leadId } = req.params;
     const { estado_conversion, isDown, fecha_down } = req.body;

     try {
          const statusFound = await EstadoConversion.findOne({ name: estado_conversion });
          if (!statusFound) return res.status(404).json({ message: `Estado ${estado_conversion} no encontrado` });

          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_conversion: statusFound._id,
               isDown,
               fecha_down,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.isVenta = async (req, res) => {
     const { leadId } = req.params;
     const { estado_conversion, isVenta, fecha_venta } = req.body;

     try {
          const statusFound = await EstadoConversion.findOne({ name: estado_conversion });
          if (!statusFound) return res.status(404).json({ message: `Estado ${estado_conversion} no encontrado` });

          const query = await Lead.findByIdAndUpdate(leadId, {
               estado_conversion: statusFound._id,
               isVenta,
               fecha_venta,
          });

          if (query) {
               res.json({ message: "Lead actualizado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para actualizar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.deleteOneById = async (req, res) => {
     const { leadId } = req.params;

     try {
          const query = await Lead.findByIdAndDelete(leadId);

          if (query) {
               res.json({ message: "Lead eliminado con éxito" });
          } else {
               return res.status(404).json({ message: "Lead no encontrado para eliminar" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.leadsBySucursalFecha = async (req, res) => {
     const { start, end } = req.body;

     try {
          const query = await Lead.find({
               fecha_ingreso: {
                    $gte: new Date(start),
                    $lte: new Date(end),
               },
          })
               .sort({ fecha_ingreso: -1 })
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });

          if (query.length > 0) {
               res.json({ total: query.length, leads: query });
          } else {
               return res.status(404).json({ message: "No existen leads" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.leadsByStatusFecha = async (req, res) => {
     const { estado_lead, start, end } = req.body;

     try {
          const query = await Lead.find({
               estado_lead,
               isConvertido: true,
               fecha_conversion: {
                    $gte: new Date(start),
                    $lte: new Date(end),
               },
          })
               .sort({ fecha_conversion: -1 })
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });

          if (query.length > 0) {
               res.json({ total: query.length, leads: query });
          } else {
               return res.status(404).json({ message: "No existen leads" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.rankingLeadsConversionByDates = async (req, res) => {
     const { start, end } = req.body;

     try {
          const filter = { fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } };
          const query = await Lead.aggregate([
               {
                    $match: filter,
               },
               {
                    $group: {
                         _id: "$estado_conversion",
                         num_leads: { $sum: 1 },
                    },
               },
               {
                    $sort: { num_leads: -1 },
               },
          ]);

          if (query.length > 0) {
               res.json({ total: query.length, ranking: query });
          } else {
               return res.status(404).json({ message: "No existen leads aún" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.countLeadsByDates = async (req, res) => {
     const { marca, estado, start, end } = req.body;

     try {
          const query = await Lead.find({
               marcaVehiculo: { $regex: ".*" + marca + ".*" },
               estado_lead: { $regex: ".*" + estado + ".*" },
               fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) },
          }).countDocuments();
          if (query >= 0) {
               res.json({ qty: query });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.countLeadsConversionyDates = async (req, res) => {
     const { marca, isBooking, isVenta, start, end } = req.body;

     try {
          // const conversionState = await EstadoConversion.findOne({ name: estado });
          let query = null;

          const marcaFound = await Marca.findOne({name: marca});
          if(!marcaFound) return res.status(404).json({message: `No se encontró marca ${marca}`});

          if (isVenta) {
               query = await Lead.find({
                    // estado_conversion: conversionState._id,
                    marcaVehiculoE: marcaFound._id,
                    isBooking,
                    isVenta,
                    fecha_conversion: { $gte: new Date(start), $lte: new Date(end) },
               }).countDocuments();
          } else {
               query = await Lead.find({
                    // estado_conversion: conversionState._id,
                    marcaVehiculoE: marcaFound._id,
                    isBooking,
                    fecha_conversion: { $gte: new Date(start), $lte: new Date(end) },
               }).countDocuments();
          }

          if (query >= 0) {
               res.json({ qty: query });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.rankingLeadsByOriginDataDateConversion = async (req, res) => {
     const { start, end, estado_lead, isAsignado, isBooking, isVenta } = req.body;

     let query = null;
     let filter = null;

     try {
          if (estado_lead) {
               filter = { estado_lead, isAsignado, fecha_ingreso: { $gte: new Date(start), $lte: new Date(end) } };
               query = await Lead.aggregate([
                    {
                         $match: filter,
                    },
                    {
                         $group: {
                              _id: "$dataOrigin",
                              totalLeads: { $sum: 1 },
                         },
                    },
                    {
                         $sort: { totalLeads: -1 },
                    },
               ]);
          } else if (isBooking) {
               filter = { isBooking, fecha_conversion: { $gte: new Date(start), $lte: new Date(end) } };
               query = await Lead.aggregate([
                    {
                         $match: filter,
                    },
                    {
                         $group: {
                              _id: "$dataOrigin",
                              totalLeads: { $sum: 1 },
                         },
                    },
                    {
                         $sort: { totalLeads: -1 },
                    },
               ]);
          } else if (isVenta) {
               filter = { isVenta: isVenta, fecha_conversion: { $gte: new Date(start), $lte: new Date(end) } };
               query = await Lead.aggregate([
                    {
                         $match: filter,
                    },
                    {
                         $group: {
                              _id: "$dataOrigin",
                              totalLeads: { $sum: 1 },
                         },
                    },
                    {
                         $sort: { totalLeads: -1 },
                    },
               ]);
          }

          if (query.length > 0) {
               res.json({ total: query.length, ranking: query });
          } else {
               return res.status(404).json({ message: "No existen leads aún" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

leadCtrl.leadsModificados = async (req, res) => {
     const { start, end } = req.body;
     try {
          const query = await Lead.find({
               updatedAt: { $gte: new Date(start), $lt: new Date(end) },
               // createdAt: { $ne: new Date(start)}
          })
               .sort({ customer_name: 1 })
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "marcaVehiculoE",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "motivoDesplegable",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });

          if (query.length > 0) {
               res.json({ total: query.length, all: query });
          } else {
               return res.status(404).json({ message: "No se encontraron leads" });
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
};

//Nuevos Cambios
leadCtrl.getLeadsByMarcaFecha = async(req, res) => {
     const { marca, start, end } = req.body;
     let query = null;

     try {
          if(start == null || start == undefined){
               query = await Lead.find({
                    marcaVehiculo: {$in: marca},
               })
               .sort({ fecha_ingreso: -1})
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "marcaVehiculoE",
                    select: "name avatar",
               })
               .populate({
                    path: "motivoDesplegable",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });
          }else{
               query = await Lead.find({
                    fecha_ingreso: {
                         $gte: new Date(start),
                         $lte: new Date(end),
                    },
                    marcaVehiculo: {$in: marca},
               })
               .sort({ fecha_ingreso: -1})
               .populate({
                    path: "sucursal_lead",
                    select: "name",
               })
               .populate({
                    path: "dataOrigin",
                    select: "name",
               })
               .populate({
                    path: "tipoFinanciamiento",
                    select: "tipo",
               })
               .populate({
                    path: "entidad_bancaria",
                    select: "name avatar",
               })
               .populate({
                    path: "estado_conversion",
                    select: "name",
               })
               .populate({
                    path: "marcaVehiculoE",
                    select: "name avatar",
               })
               .populate({
                    path: "motivoDesplegable",
                    select: "name",
               })
               .populate({
                    path: "auto",
                    select: "chasis model cod_tdp, version",
                    populate: [
                         {
                              path: "chasis",
                              select: "name",
                         },
                         {
                              path: "model",
                              select: "name marca avatar",
                              populate: {
                                   path: "marca",
                                   select: "name avatar",
                              },
                         },
                    ],
               })
               .populate({
                    path: "asesorAsignado",
                    select: "name tipo marca avatar",
                    populate: {
                         path: "marca",
                         select: "name avatar",
                    },
               })
               .populate({
                    path: "createdBy",
                    select: "name username",
               });
          }

          if(query.length > 0){
               res.json({ total: query.length, all: query });
          }else{
               return res.status(404).json({message: `No hay leads con la marca ${marca}`})
          }
     } catch (err) {
          console.log(err);
          return res.status(503).json({ message: err.message });
     }
}

export default leadCtrl;
