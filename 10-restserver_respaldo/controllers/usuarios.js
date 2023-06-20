import { response, request } from 'express';

export const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

  res.json({
    msg: 'get API - controlador',
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

export const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: 'post API - controlador',
    nombre,
    edad,
  });
};

export const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: 'put API - controlador',
    id,
  });
};

export const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - controlador',
  });
};

export const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete API - controlador',
  });
};
