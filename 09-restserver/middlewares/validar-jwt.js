import { request, response } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req = request, res = response, next) => {
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

    // Nos interesa el uid, para dejarlo en algún lugar que me permita procesarlo en los controladores.
    // Lo dejamos como una variable nueva en la request!
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
