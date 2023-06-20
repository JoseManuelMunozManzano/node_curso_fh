// Esto se importa más que nada para tener la ayuda de VSCode con el autocompletado.
// En TypeScript no haría falta.
import { response } from 'express';

export const usuariosGet = (req, res = response) => {
  res.json({
    msg: 'get API - controlador',
  });
};

export const usuariosPost = (req, res) => {
  // Extrayendo el body de la request.
  // Habría que hacer una limpieza de la información para evitar que vengan scripts o inyección maliciosa...
  // Esto lo vamos a ver después.
  // Es muy común desestructurar lo que necesitamos del body. Sería una pequeña validación para recoger lo que realmente queremos.
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: 'post API - controlador',
    nombre,
    edad,
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
