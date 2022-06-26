const Insumo = require('../models/insumoModel')


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
    Insumo.findOne({_id: idInsumo, proyectos: {$elemMatch: {_id: idProyecto, "pendiente.solicitado": true}}},
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
                Insumo.findOneAndUpdate({_id: idInsumo, proyectos: {$elemMatch: {_id: idProyecto}}}, { $set: {"proyectos.$.pendiente": pendiente}},
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
                        return (
                            res.json({
                                ok: true,
                                insumo: insumoAgregado
                            })
                        )
                    }
                })


                // return (
                //     res.status(409).json({
                //         ok: true,
                //         insumo: insumoDB
                //     })
                // )
            }
            else {
                return (
                    res.status(409).json({
                        ok: false,
                        message: "El insumo ya tiene una solicitud pendiente y no puede ser solicitado nuevamente hasta que se cancele la solicitud actual"
                    })
                )               
            }

    
            // res.json({
            //     ok: true,
            //     proyecto: proyectoDB
            // })
       })
    
}

