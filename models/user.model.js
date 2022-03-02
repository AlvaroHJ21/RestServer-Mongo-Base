/**
 * Como queremos que se vean nuestros registros
 */
const objeto = {
    nombre: "",
    correo: "",
    password: "",
    img: "",
    rol: "",
    estado: false,
    google: false,
};

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },

    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "El correo es obligatorio"],
    },

    img: String,

    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    },

    estado: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },
});

/**
 * Podemos crear o sobreescribir métodos de los schemas, acá
 * sobreescribimos el método toJSON para hacer que no nos devuelva
 * el password. Tiene que ser una funcion normal (function())
 */
UsuarioSchema.methods.toJSON = function () {
    /**
     * Queremos sacar el _v y el password,
     * luego unificamos lo que sobra con el
     * operador spreat y lo retornamos
     */
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
};

const Usuario = model("Usuario", UsuarioSchema);
module.exports = Usuario;
