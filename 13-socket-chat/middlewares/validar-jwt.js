import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import { Usuario } from '../models/usuario.js';

export const validarJWT = async (req = request, res = response, next) => {
  // Obtener el JWT.
  // Se acostumbra que vaya en los headers, y en esta app, la key que espero en el header la he llamado x-token
  const token = req.header('x-token');

  // No autorizado
  if (!token) {
    // Importante el return para salir.
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  // Validación del jwt
  try {
    // Si no se realiza el verify va al catch.
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // Leer el usuario que corresponde al uid.
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en BD',
      });
    }

    // Verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      });
    }

    // Dejamos guardado el usuario como una variable nueva en la request.
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
