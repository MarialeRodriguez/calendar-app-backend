/*
    Rutas de Usuarios / Events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

//Todas pasar por la validacion de JWT
router.use(validarJWT);

//Obtener Evento
router.get('/', getEventos );

//Crear un nuevo Evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
     crearEvento );

//Actualizar Evento
router.put('/:id',validarCampos, actualizarEvento );

//Borrar Evento
router.delete('/:id',validarCampos, eliminarEvento );


module.exports = router;