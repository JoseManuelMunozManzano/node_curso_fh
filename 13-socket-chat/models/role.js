// Nos hemos creado los roles en MongoDB directamente, creando una colección y luego añadiendo los datos.
// No se le va a dar mantenimiento por la aplicación.

// Ahora creamos este modelo para poder trabajar con esos roles.
import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
});

export const Role = model('Role', RoleSchema);
