// Mongo se graba en objetos, llamados documentos, y estos documentos se graban dentro de colecciones,
// que, su sinónimo en bases de datos relaciones, sería una tabla.

// Un modelo nos sirve para hacer que los registros luzcan de la manera que esperamos.
import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    // Se indica que es requerido y un mensaje de error en caso de que el nombre no se envíe.
    // De todas formas haremos nuestras validaciones para que la BD no tenga que hacer este tipo de trabajo.
    // La información que llegue a BD debe ser buena y tenemos que evitar que estos errores aparezcan.
    required: [true, 'El nombre es obligatorio'],
  },

  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    // Igualmente, aunque indiquemos aquí que este valor debe ser único, tenemos que validarlo antes.
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },

  img: {
    type: String,
  },

  rol: {
    type: String,
    // Como vemos, no necesariamente tenemos que informar un error personalizado en caso de que sea requerido
    // y no venga el dato.
    required: true,
    // Valores posibles de este campo.
    // Como los recuperamos de BD se va a quitar para no tener que estar hardcodeando esto.
    // enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
  },

  estado: {
    type: Boolean,
    // Valor por defecto si no indicamos ninguno.
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

// Sobreescribimos el método toJSON para quitar el password y la version (__v) cuando se hace un POST.
// Cuando llamemos al toJSON se va a ejcutar esta función.
// IMPORTANTE: Tiene que ser una function. No vale función de flecha porque necesitamos que el this haga referencia
// a la instancia creada.
UsuarioSchema.methods.toJSON = function () {
  // Esto genera la instancia con los valores respectivos, como si fuera un objeto literal de JavaScript.
  // De ahí cogemos usuario con todos los campos salvo __v y password, y los devolvemos.
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

// La BD cuando cree la tabla (colección en Mongo), automáticamente lo pone en plural, en este caso la colección
// se llamará Usuarios
export const Usuario = model('Usuario', UsuarioSchema);
