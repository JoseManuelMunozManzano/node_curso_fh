import { response } from 'express';

import { Categoria } from '../models/index.js';

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
