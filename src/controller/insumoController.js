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


