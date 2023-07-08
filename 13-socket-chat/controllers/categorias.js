import { response } from 'express';

import { Categoria } from '../models/index.js';

// obtenerCategorias - paginado - total - populate (mongoose) del usuario
// https://mongoosejs.com/docs/populate.html
export const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(desde).limit(limite).populate('usuario', 'nombre'),
  ]);

  res.json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate {objeto de la categoria}
export const obtenerCategoriaPorId = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  res.json(categoria);
};

export const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre} ya existe`,
    });
  }

  // Generar la data a guardar.
  //
  // Por ejemplo el estado, si me lo mandan, lo tengo que excluir, así que tengo
  // que preparar lo que quiero guardar. El estado, por defecto, lo guardo en true.
  //
  // Igual que el usuario, me lo pueden mandar, pero yo quiero guardar el usuario
  // que está haciendo el post. Para eso utilizo el id del JWT.
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar en DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizarCategoria (nombre)
export const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;

  // Solo voy a actualizar el nombre y el usuario que actualiza.
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

// borrarCategoria (id) - estado: false
export const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  // Solo voy a actualizar el estado y el usuario que actualiza.
  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false, usuario: req.usuario }, { new: true });

  res.json(categoria);
};
