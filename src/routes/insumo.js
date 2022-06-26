const router = require('express').Router();
const insumosController = require('../controller/insumoController')




router.route('/insumo/:id/reservar')
    .post(insumosController.reservar)

// Usuarios
router.route('/insumo')
    .post(insumosController.add)
    .get(insumosController.list)

<<<<<<< HEAD

=======
router.route('/insumo/:id/solicitud')
    .post(insumosController.solicitar)
>>>>>>> ddf2232bc9fd0d2248841ed18418a9079f400d6d
module.exports = router;