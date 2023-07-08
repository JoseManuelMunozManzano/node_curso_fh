// Aquí es donde disparamos la conexión con nuestro backend server.

const url = 'http://localhost:8080/api/auth';

let usuario = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

// Validar el token del LocalStorage
const validarJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('No hay token en el servidor');
  }

  // Añadiendo al header el parámetro x-token, que contiene nuestro token.
  const resp = await fetch(url, {
    headers: { 'x-token': token },
  });

  // Renovando el token y obteniendo el usuario que está conectado.
  const { usuario: userDB, token: tokenDB } = await resp.json();
  localStorage.setItem('token', tokenDB);
  usuario = userDB;

  document.title = usuario.nombre;

  await conectarSocket();
};

const conectarSocket = async () => {
  // Validación del JWT contra nuestro socket.
  // Aquí le estoy diciendo que se conecte, pero en el backend no sé quien es.
  // En cada uno de los mensajes que ese socket envíe vamos a meter este token, y así comprobamos si es válido o no.
  // El problema es que bastante información del payload va a ser información que no me interesa (el token)
  socket = io({
    extraHeaders: {
      'x-token': localStorage.getItem('token'),
    },
  });

  socket.on('connect', () => {
    console.log('Sockets online');
  });

  socket.on('disconnect', () => {
    console.log('Sockets offline');
  });

  socket.on('recibir-mensajes', () => {
    // TODO:
  });

  socket.on('usuarios-activos', (payload) => {
    console.log(payload);
  });

  socket.on('mensaje-privado', () => {
    // TODO:
  });
};

const main = async () => {
  // Lo primero es validar que el JWT sea correcto.
  await validarJWT();
};

main();
