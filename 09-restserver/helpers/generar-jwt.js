import jwt from 'jsonwebtoken';

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
