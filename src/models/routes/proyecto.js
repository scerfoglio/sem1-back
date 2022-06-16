const router = require('express').Router();
const proyectoController = require('../controller/proyectoController')



// Usuarios


router.route('/proyecto/:id/usuario/:idUsuario')
    .put(proyectoController.updateUsuario)

    router.route('/proyecto/:id/usuario')
    .post(proyectoController.addUsuario)

router.route('/proyecto/:id/insumo')
    .put(proyectoController.addInsumo)
    
router.route('/proyecto/:id')
    .get(proyectoController.getOne)
    //.put(encuestaController.update)
    //.delete(encuestaController.delete)


router.route('/proyecto')
    .post(proyectoController.add)
    .get(proyectoController.list)
    

module.exports = router;
