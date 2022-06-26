const router = require('express').Router();
const insumosController = require('../controller/insumoController')




router.route('/insumo/:id/reservar')
    .post(insumosController.reservar)

// Usuarios
router.route('/insumo')
    .post(insumosController.add)
    .get(insumosController.list)

module.exports = router;