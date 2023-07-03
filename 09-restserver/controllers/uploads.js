import { response } from 'express';

export const cargarArchivo = (req, res = response) => {
  res.json({
    msg: 'Hola Mundo',
  });
};
