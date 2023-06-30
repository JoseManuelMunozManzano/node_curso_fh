// Nombre del archivo categoria.js, en singular.

import { Schema, model } from 'mongoose';

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },

  estado: {
    type: Boolean,
    default: true,
    required: true,
  },

  // El tipo es otro objeto de Mongo e indicamos el esquema 'Usuario'. Ese texto tiene que ser
  // el mismo que aparece en usuario.js, al final en el model.
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

export const Categoria = model('Categoria', CategoriaSchema);
