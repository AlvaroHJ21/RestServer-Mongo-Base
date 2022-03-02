const mongoose = require("mongoose");

/***
 * Creamos la funcion async para hacer la conexion con
 * await, ya que mongoose.connect() devuelve una promesa
 * y lo encerramos en un trycatch para manejar errores
 */
const dbConecction = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{ 
            /***
             * objetos que se piden en la documentacion
             * El método connect también acepta un objeto options que se 
             * pasará al controlador MongoDB subyacente.
             */
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexion a la base de datos!")
    } catch (error) {
        console.log(error);
        throw new Error("Error en la conexion de la base de datos");
    }
};

module.exports = {
    dbConecction,
};
