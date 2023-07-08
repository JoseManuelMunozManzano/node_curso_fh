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

CategoriaSchema.methods.toJSON = function () {
  const { __v, _id, usuario, ...categoria } = this.toObject();

  const { __v: __v2, password, _id: id2, ...resto } = usuario;
  categoria.usuario = resto;
  categoria.usuario.uid = id2;

  categoria.uid = _id;

  return categoria;
};

export const Categoria = model('Categoria', CategoriaSchema);
