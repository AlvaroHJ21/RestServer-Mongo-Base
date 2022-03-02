const Role = require("../models/role.model");
const Usuario = require("../models/user.model");


const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error("El rol no está registrado en la BD");
    }
}

const emailExiste = async(correo = "") =>{
    const existeRol = await Usuario.findOne({correo})
    if(existeRol){
        throw new Error("El email existe en la BD");
    }
}

const existeUsuarioPorId = async(id = "") =>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error("No existe un usuario con ese id: "+id);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}