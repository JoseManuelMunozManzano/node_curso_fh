// Middlewares personalizados.
// Recogemos los errores de express-validator y si hay los devolvemos.
import { validationResult } from 'express-validator';

// Como es un middleware, además de la request y la response existe un tercer argumento que usualmente se
// llama next, que es a lo que tenemos que llamar si este middleware se ejecuta hasta el final.
// Lo que indica next() es, que si llega a el, pase al siguiente middleware, y si no hay más middlewares,
// entonces pasa al controlador.
export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};
