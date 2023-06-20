// Esto se importa más que nada para tener la ayuda de VSCode con el autocompletado.
// En TypeScript no haría falta.
import { response } from 'express';

export const usuariosGet = (req, res = response) => {
  res.json({
    msg: 'get API - controlador',
  });
};

export const usuariosPost = (req, res) => {
  res.status(201).json({
    msg: 'post API - controlador',
  });
};

export const usuariosPut = (req, res) => {
  res.json({
    msg: 'put API - controlador',
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
