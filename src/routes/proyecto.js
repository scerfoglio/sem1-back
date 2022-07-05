const router = require('express').Router();
const proyectoController = require('../controller/proyectoController')





router.route('/proyecto/:id/disponibilizar')
    .post(proyectoController.disponibilizar)

router.route('/proyecto/:id/usuario/:idUsuario')
    .patch(proyectoController.updateUsuario)

    router.route('/proyecto/:id/usuario')
    .post(proyectoController.addUsuario)

router.route('/proyecto/:id/insumo')
    .put(proyectoController.addInsumo)
    
router.route('/proyecto/:id')
    .get(proyectoController.getOne)

router.route('/proyecto')
    .post(proyectoController.add)
    .get(proyectoController.list)
    

module.exports = router;
