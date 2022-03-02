const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, "El role es obligatorio"]
    }
});

const Role = model("Role", RoleSchema);

module.exports = Role;
