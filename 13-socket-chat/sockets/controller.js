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
  // 3. Enviar los últimos 10 mensajes.
  // 4. Conectarlo a una sala especial.
  //
  // Para evitar tener que hacer un emit y luego un emit.broadcast, es decir, dos emisiones, pasaremos
  // a esta función el io, que es todo nuestro servidor de sockets. Ahí están todos los usuarios, incluido el que
  // se acaba de conectar.
  chatMensajes.conectarUsuario(usuario);
  io.emit('usuarios-activos', chatMensajes.usuariosArr);
  socket.emit('recibir-mensajes', chatMensajes.ultimos10);

  // Mensajes privados
  //
  // Cuando un socket se conecta, se enlaza a dos salas directamente, una sala
  // global en la que el io tiene el control absoluto y le puede mandar un mensaje
  // a cualquier persona, y otra sala con su propio id, pero el inconveniente de este
  // id es que es muy volátil. Para usar el socket id se haría algo así.
  // socket.to(socket.id).emit()
  // Pero es mejor no usarlo.
  //
  // Lo que tenemos que usar para mandar mensajes privados es el id de los usuarios.
  // Igual, si quisiéramos crear salas de chat, el nombre de la sala sería igual al id
  // del usuario al que necesito mandarle el mensaje.
  //
  // Conectarlo a una sala especial.
  // Con esto ya tenemos tres salas: global, socket.id, usuario.id
  socket.join(usuario.id);

  // Limpiar cuando alguien se desconecta.
  socket.on('disconnect', () => {
    chatMensajes.desconectarUsuario(usuario.id);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
  });

  socket.on('enviar-mensaje', ({ uid, mensaje }) => {
    if (uid) {
      // Mensaje privado
      socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje });
    } else {
      // Mensaje a todo el mundo
      chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
      io.emit('recibir-mensajes', chatMensajes.ultimos10);
    }
  });
};
