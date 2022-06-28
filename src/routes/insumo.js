const router = require('express').Router();
const insumosController = require('../controller/insumoController')




router.route('/insumo/:id/reservar')
    .post(insumosController.reservar)

router.route('/insumo/:id/aceptar')
    .post(insumosController.aceptar)

router.route('/insumo/:id/rechazar')
    .post(insumosController.rechazar)


// Usuarios
router.route('/insumo')
    .post(insumosController.add)
    .get(insumosController.list)

module.exports = router;