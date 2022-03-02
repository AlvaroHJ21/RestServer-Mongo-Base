const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/user.model");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query; //QUERY PARAMS

    const query = { estado: true };
    /**
     * Se quiere lanzar dos peticiones await simultaneamente,
     * Promise.all() nos permite enviarle un arreglo con las
     * promesas que queremos que se ejecuten de forma simultanea.
     * No termina hasta que todas terminen.
     * Si una da error, todas dan error.
     * La respuesta es una coleccion de las dos promesas.
     */

    /**
     * Desestrucutracion de arreglo
     */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), //Una promesa para saber el numero de documentos
        Usuario.find(query) //Otra promesa para realizar el get de usuarios
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({ total, usuarios });
};

const usuariosPost = async (req = request, res = response) => {
    const body = req.body;
    const { nombre, correo, password, rol } = body;

    /**
     * Creamos el modelo de usuario
     */
    const usuario = Usuario({ nombre, correo, password, rol });

    /**
     * Encriptar la contraseña
     * Genearamos una cantidad de saltos para hacer
     * la contraseña más segura, por defecto 10
     */
    const salt = bcryptjs.genSaltSync();

    /**
     * Encriptamos
     */
    usuario.password = bcryptjs.hashSync(password, salt);

    /**
     * Guardar en la BD
     */
    /**
     * Para guardar el usuario en la
     * base de de datos, await para
     * que espere la grabación
     */
    await usuario.save();

    res.json({
        ok: true,
        msg: "POST a mi API - Controlador",
        usuario,
    });
};

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params; //SEGMENT PARAMS

    /**
     * Extraemos del body, todos los parametros
     * que no necesitamos
     */
    const { _id, password, google, ...resto } = req.body;

    /**
     * Si password existe quiere decir que se quiere
     * actualizar el campo
     */
    if (password) {
        /**
         * Encriptamos la nueva contraseña
         */
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    /**
     * Actualizar el registro
     * findByIdAndUpdate(), busca por id y lo actualiza
     * @param1: id del documento
     * @param2: cuerpo
     * @param3: {new: true} es para que retorne el usuario actualizado
     */

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    /**
     * Borramos logicamente
     */
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        ok: true,
        msg: "DELETE a mi API - Controlador",
        usuario,
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};
