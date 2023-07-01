import { response } from 'express';

export const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  res.json({
    coleccion,
    termino,
  });
};
