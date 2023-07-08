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

  socket.on('recibir-mensajes', dibujarMensajes);

  socket.on('usuarios-activos', dibujarUsuarios);

  socket.on('mensaje-privado', () => {
    // TODO:
  });
};

const dibujarUsuarios = (usuarios = []) => {
  let usersHtml = '';
  usuarios.forEach(({ nombre, uid }) => {
    usersHtml += `
      <li>
        <p>
          <h5 class="text-success">${nombre}</h5>
          <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `;

    ulUsuarios.innerHTML = usersHtml;
  });
};

const dibujarMensajes = (mensajes = []) => {
  let mensajesHTML = '';
  mensajes.forEach(({ mensaje, nombre }) => {
    mensajesHTML += `
      <li>
        <p>
          <span class="text-primary">${nombre}:</span>
          <span>${mensaje}</span>
        </p>
      </li>
    `;

    ulMensajes.innerHTML = mensajesHTML;
  });
};

txtMensaje.addEventListener('keyup', (ev) => {
  // El keyCode es el código de la letra pulsada.
  // El 13 es el Intro
  const keyCode = ev.keyCode;
  const mensaje = txtMensaje.value;
  const uid = txtUid.value;

  if (keyCode !== 13) return;
  if (mensaje.length === 0) return;

  socket.emit('enviar-mensaje', { mensaje, uid });

  txtMensaje.value = '';
});

const main = async () => {
  // Lo primero es validar que el JWT sea correcto.
  await validarJWT();
};

main();
