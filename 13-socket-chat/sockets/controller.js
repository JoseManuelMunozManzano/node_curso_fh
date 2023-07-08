import { comprobarJWT } from '../helpers/index.js';
import { ChatMensajes } from '../models/index.js';

// Esto solo se ejecuta una vez, cuando el servidor se levanta y luego siempre usaremos la misma instancia.
const chatMensajes = new ChatMensajes();

export const socketController = async (socket, io) => {
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

  // Cuando una persona se conecta hay que:
  // 1. Agregar el usuario conectado
  // 2. Emitir a toda la gente que está conectada para hacerles saber que un usuario se ha conectado.
  //
  // Para evitar tener que hacer un emit y luego un emit.broadcast, es decir, dos emisiones, pasaremos
  // a esta función el io, que es todo nuestro servidor de sockets. Ahí están todos los usuarios, incluido el que
  // se acaba de conectar.
  chatMensajes.conectarUsuario(usuario);
  io.emit('usuarios-activos', chatMensajes.usuariosArr);

  // Limpiar cuando alguien se desconecta.
  socket.on('disconnect', () => {
    chatMensajes.desconectarUsuario(usuario.id);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
  });
};
