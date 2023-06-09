// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// Aquí estará toda la configuración y comunicación que vamos a tener, usando WebSockets, con el servidor.

// Para ver desde el servidor el cliente conectado.
const socket = io();

// Listeners: son observables que están escuchando cambios o eventos

// on es para escuchar eventos
// Cuando me conecto al servidor
socket.on('connect', () => {
  // console.log('Conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

// Cuando me desconecto del servidor
socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('enviar-mensaje', (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: '123ABC',
    fecha: new Date().getTime(),
  };

  // emit es para emitir eventos.
  // Lo normal es enviar objetos literales, no texto plano. Así podemos enviar de una tacada todo lo que queremos al server.
  //
  // Retroalimentación/feedback al cliente que emitió el mensaje hacia el server.
  // emit() puede tener un tercer argumento, un callback que recibe lo que sea que se le mande desde el server.
  // Este callback se ejecuta en el servidor cuando todo termina (ya sea bien o mal) y solo lo recibe el cliente que emite el mensaje.
  socket.emit('enviar-mensaje', payload, (id) => {
    console.log('Desde el server', id);
  });
});
