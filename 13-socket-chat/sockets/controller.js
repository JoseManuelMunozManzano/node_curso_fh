import { comprobarJWT } from '../helpers/index.js';

export const socketController = async (socket) => {
  // Tenemos que validar este socket porque no sabemos si es una persona autenticada y
  // si tenemos que dejarlo pasar o no.
  // Como todo lo tenemos ya con nuestro restserver, lo que tenemos que hacer es evaluar
  // el JWT. ¿Pero como lo pasamos al socket? Necesito el uid basado en el token.
  //
  // Ver public/js/chat, métodos validarJWT() y conectarSocket(). En este último método del front estamos
  // enviando el token a nuestro backend.
  const token = socket.handshake.headers['x-token'];

  // Ahora cogemos el token y lo validamos.
  // Regresará el usuario que corresponde a ese token.
  const usuario = await comprobarJWT(token);

  // Si no viene el token o no podemos obtener el usuario le desconectamos.
  if (!usuario) {
    return socket.disconnect();
  }

  console.log('Se conectó', usuario.nombre);
};
