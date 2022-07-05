const Insumo = require('../models/insumoModel')
const Proyecto = require('../models/proyectoModel')
const ObjectoId = require('mongoose');

exports.add = function(req,res) {

    Insumo.findOneAndUpdate({nombre: req.body.nombre, unidad: req.body.unidad}, {
        new: true,
        runValidators: true,
        context: 'query',
        upsert: true
    } , (err, nuevoInsumoDB) => {        
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }
        res.json({
            ok:true,
            insumo: nuevoInsumoDB
        })
    }
    )
}

exports.list = async function(req,res) {
    const regexFilterFields = ['nombre'];
    const filters = {};
    for (const filterField of regexFilterFields) {
        if (req.query[filterField]) {
            filters[filterField] = { $regex: new RegExp(req.query[filterField], 'i') };
        }
    }
    const insumos = await Insumo.find(filters);
    res.json({
        ok:true,
        insumos: insumos
    })
}

exports.solicitar = function(req,res) {
    let insumo = req.params.id
    let body = req.body
    let cantidad = body.cantidad
    let proyecto = body.idProyecto
    let usuario = body.idUsuario
}

exports.reservar = function(req,res) {
    let idInsumo = req.params.id
    let body = req.body
    let idProyecto = body.idProyecto
    let cantidad = body.cantidad
    let solicitante = body.solicitante
    Insumo.findOne({_id: idInsumo, proyectos: {$elemMatch: {_id: idProyecto, $or: [ { cantidad: {$lt: cantidad} } , { "pendiente.solicitado": true }]}}},
    //Insumo.findOne({_id: idInsumo, proyectos: {$elemMatch: {_id: idProyecto, $or: [ { cantidad: {$lte: cantidad} } , { "pendiente.solicitado": false }]}}},
        (err,insumoDB) => {
            if (err) {
                return (
                    res.status(400).json({
                        ok: false,
                        message: err.message,
                        err: err
                    })
                )
            }
            if (!insumoDB ) {
                let pendiente = {}
                pendiente.solicitado = true
                pendiente.cantidad = cantidad
                pendiente.aceptado = false
                pendiente.solicitante = solicitante
                pendiente._id = new ObjectoId.Types.ObjectId()
                Insumo.findOneAndUpdate({_id: idInsumo, proyectos: { $elemMatch: {_id: idProyecto}}}, { $set: {"proyectos.$.pendiente": pendiente}, $inc: {"proyectos.$.cantidad": -cantidad}},
                {
                    new: true,
                    runValidators: true,
                    context: 'query',
                    upsert: false
                },  (err,insumoAgregado) => {
                    if (err) {
                        return (
                            res.status(400).json({
                                ok: false,
                                message: err.message,
                                err: err
                            })
            
                        )
                    }
                    else {
                        Proyecto.findOneAndUpdate({_id: idProyecto, insumos: { $elemMatch: { nombre: insumoAgregado.nombre}}}, { $set: {"insumos.$.pendiente": pendiente} /*, $inc: {"insumos.$.cantidad": -cantidad}*/},
                        {
                            new: true,
                            runValidators: true,
                            context: 'query',
                            upsert: false
                        },  (err,insumoAgregadoAProyecto) => {
                            if (err) {
                                return (
                                    res.status(400).json({
                                        ok: false,
                                        message: err.message,
                                        err: err,
                                        message2: "Considerar hacer el rollback de la reserva del insumo"
                                    })
                    
                                )
                            }
                            return (
                                res.json({
                                    ok: true,
                                    insumo: insumoAgregado
                                })
                            )
                        }) 
                    }
                })
            }
            else {
                return (
                    res.status(409).json({
                        ok: false,
                        message: "El insumo ya tiene una solicitud pendiente o no cumple con la cantidad solicitada en stock y no puede solicitarse en este momento"
                    })
                )               
            }
       })
    
}
 
exports.aceptar = function(req, res) {
    let idInsumo = req.params.id
    let idProyecto = req.body.idProyecto
    let idSolicitud = req.body.idSolicitud
    Insumo.findOne({_id: idInsumo, proyectos: { $elemMatch: {_id: idProyecto, "pendiente.$._id": idSolicitud}}},
        (err,insumoDB) => {
            if (err) {
                return (
                    res.status(400).json({
                        ok: false,
                        message: err.message,
                        err: err
                    })
                )
            }
            if (!insumoDB ) {
                return res.status(404).json({
                    ok: false,
                    message: "No se encontró el proyecto buscado",
                    err: "Verificar el proyecto con id" + id 
                })
            }
            let proyecto = insumoDB.proyectos.find(proyecto => proyecto._id = idProyecto) 
            Insumo.findOneAndUpdate({_id: idInsumo, proyectos: { $elemMatch: {_id: idProyecto, "pendiente.$._id": idSolicitud}}}, { $set: {"proyectos.$.pendiente.aceptado": true, "proyectos.$.pendiente.solicitado": false}/*,  $inc: {"proyectos.$.cantidad": -proyecto.pendiente.cantidad}*/}, 
            {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: false
            }, (err,insumoAgregado) => {
                if (err) {
                    return (
                        res.status(400).json({
                            ok: false,
                            message: err.message,
                            err: err
                        })
        
                    )
                }
                Proyecto.findOneAndUpdate({_id: idProyecto, insumos: { $elemMatch: { nombre: insumoAgregado.nombre}}}, { $set: {"insumos.$.pendiente.aceptado": true, "insumos.$.pendiente.solicitado": false} , $inc: {"insumos.$.cantidad": -proyecto.pendiente.cantidad}},
                        {
                            new: true,
                            runValidators: true,
                            context: 'query',
                            upsert: false
                        },  (err,insumoAgregadoAProyecto) => {
                            if (err) {
                                return (
                                    res.status(400).json({
                                        ok: false,
                                        message: err.message,
                                        err: err,
                                        message2: "Considerar hacer el rollback de la reserva del insumo"
                                    })
                    
                                )
                            }
                            return (
                                res.json({
                                    ok: true,
                                    insumo: insumoAgregado
                                })
                            )
                        }) 
            })
        }
    )
}

exports.rechazar = function(req, res) {
    let idInsumo = req.params.id
    let idProyecto = req.body.idProyecto
    let idSolicitud = req.body.idSolicitud
    Insumo.findOne({_id: idInsumo, proyectos: { $elemMatch: {_id: idProyecto, "pendiente.$._id": idSolicitud}}},
        (err,insumoDB) => {
            if (err) {
                return (
                    res.status(400).json({
                        ok: false,
                        message: err.message,
                        err: err
                    })
                )
            }
            if (!insumoDB ) {
                return res.status(404).json({
                    ok: false,
                    message: "No se encontró el proyecto buscado",
                    err: "Verificar el proyecto con id" + id 
                })
            }
            let proyecto = insumoDB.proyectos.find(proyecto => proyecto._id = idProyecto) 
            Insumo.findOneAndUpdate({_id: idInsumo, proyectos: { $elemMatch: {_id: idProyecto, "pendiente.$._id": idSolicitud}}}, { $set: {"proyectos.$.pendiente.aceptado": false, "proyectos.$.pendiente.solicitado": false},  $inc: {"proyectos.$.cantidad": proyecto.pendiente.cantidad}}, 
            {
                new: true,
                runValidators: true,
                context: 'query',
                upsert: false
            }, (err,insumoAgregado) => {
                if (err) {
                    return (
                        res.status(400).json({
                            ok: false,
                            message: err.message,
                            err: err
                        })
        
                    )
                }
                Proyecto.findOneAndUpdate({_id: idProyecto, insumos: { $elemMatch: { nombre: insumoAgregado.nombre}}}, { $unset: {"insumos.$.pendiente": ""}},
                        {
                            new: true,
                            runValidators: true,
                            context: 'query',
                            upsert: false
                        },  (err,insumoAgregadoAProyecto) => {
                            if (err) {
                                return (
                                    res.status(400).json({
                                        ok: false,
                                        message: err.message,
                                        err: err,
                                        message2: "Considerar hacer el rollback de la reserva del insumo"
                                    })
                    
                                )
                            }
                            return (
                                res.json({
                                    ok: true,
                                    insumo: insumoAgregado
                                })
                            )
                        }) 
            })
        }
    )
    
}