const { Router } = require('express')
const { check } = require('express-validator')
const { getUser, create, update, destroy } = require('../controller/user')
const { rolValidate, emailExist, idUserExist } = require('../helpers/db-validators')
// const userValidate = require('../middleware/userValidate')
// const JWTValidate = require('../middleware/JWTValidate')
// const isADMIN = require('../middleware/roleValidate')
const {
    userValidate,
    JWTValidate,
    isADMIN
} = require('../middleware');

const router = Router()

router.get('/', getUser)

router.post('/',
    [
        JWTValidate,
        check('nombre', 'El nombre en obligatorio').not().isEmpty(),
        check('correo', 'El correo en obligatorio').not().isEmpty(),
        check('password', 'El password en obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 3 caracteres').isLength({ min: 3 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExist),
        // check('rol', 'El rol no es valido').isIn(['ADMIN', 'USER']),
        check('rol').custom(rolValidate),
        userValidate
    ],
    create
)

router.put('/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(idUserExist),
        check('rol').custom(rolValidate),
        userValidate
    ], update)

router.delete('/:id',
    [
        JWTValidate,
        isADMIN,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(idUserExist),
        userValidate
    ], destroy)

module.exports = router