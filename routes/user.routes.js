const { Router } = require("express");
const { check } = require("express-validator");
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
} = require("../controllers/user.controller");
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
} = require("../helpers/db-validator.helper");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const router = Router();

router.get("/", usuariosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser más de 6 letras").isLength({
            min: 6,
        }),
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExiste),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost
);

/**
 * Definimos nuestros middlewares
 */
router.put(
    "/:id",
    [
        /**
         * El check() permite datos de segmento /:id
         * isMongoId() valida si el campo es un id de mongo
         */
        check("id", "No es un id válido").isMongoId(),

        /**
         * Usamos nuestra validación
         */
        check("id").custom(existeUsuarioPorId),

        check("rol").custom(esRoleValido),

        /**
         * Colocamos al final nuestra funcion para validar los errores,
         * para que no continue al controlador si hay errores
         */
        validarCampos,
    ],
    usuariosPut
);

/**
 * Tambien recibiremos el id como segmento
 */
router.delete(
    "/:id",
    [
        check("id", "No es un id válido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;
