// Como luce nuestro usuario en BD
// Sequelize crea dos campos automáticamente: createdAt y updatedAt
// Se puede configurar para que no los cree (ver connection.ts), pero son campos útiles.
// NOTA: HAY QUE CREARLOS TAMBIEN EN BD!
//
// El id, al ser un autonumérico, sequelize lo maneja de forma automática, por lo que
// no hace falta declararlo.
//
// Este modelo ya está conectado a la BD.
// La idea de hacer un modelo es que este se encarga de hacer saneamiento de los queries,
// hacer las inserciones de manera segura y evitamos inyecciones de SQL.
import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const Usuario = db.define('Usuario', {
  name: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  // Aunque en BD se ha declarado estado como un TINYINT, aquí lo indicamos como booleano
  // y sequelize hará la transformación automática a 0 y 1.
  // En principio deberíamos poner el mismo tipo.
  // Es solo para saber que se puede hacer.
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

export default Usuario;
