import jwt from 'jsonwebtoken';

import { Usuario } from '../models/usuario.js';

// Para que generarJWT trabaje en torno a promesas, vamos a devolver una!
// Nos lleva el user identifier. Es lo único que voy a almacenar en el payload del JWT.
export const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4d' }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

export const comprobarJWT = async (token = '') => {
  try {
    if (token.length < 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // Una vez tenemos el uid usamos nuestro modelo del Usuario para cargar la información del mismo.
    const usuario = await Usuario.findById(uid);

    if (usuario && usuario.estado) {
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
