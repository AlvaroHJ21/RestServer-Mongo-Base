const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * Como es un middleware va contar con un tercer parametro next()
 * que es una funcion que se debe llamar si el middleware pasa
 * por eso la llamamos al final del bloque, para que siga con el 
 * siguiente middleware, así sucesivamente hasta que llega al 
 * controlador
 */
const validarCampos = (req = request, res = response, next) => {
    /**
     * Validamos los resultados de los errores captados por el check()
     * pasamos como parámetro la request para que extraiga los errores
     * si estos existen
     */
    const errors = validationResult(req);
    /**
     * Si los errores no están vacios enviamos los mismos por la response
     */
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
};

module.exports = {
    validarCampos,
};
