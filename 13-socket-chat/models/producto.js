import { Schema, model } from 'mongoose';

const ProductoSchema = Schema({
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

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },

  precio: {
    type: Number,
    default: 0,
  },

  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },

  descripcion: { type: String, default: '' },

  disponible: { type: Boolean, default: true },

  img: { type: String },
});

// Otra forma de hacerlo, sin descomponer el usuario ni la categoria.
// En el controller lo que se hace es coger en el populate solo lo que necesitamos del usuario y de la categoría.
ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export const Producto = model('Producto', ProductoSchema);
