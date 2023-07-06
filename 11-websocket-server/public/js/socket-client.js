// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

// Aquí estará toda la configuración y comunicación que vamos a tener, usando WebSockets, con el servidor.

// Para ver desde el servidor el cliente conectado.
const socket = io();

// Listeners: son observables que están escuchando cambios o eventos

// Cuando me conecto al servidor
socket.on('connect', () => {
  console.log('Conectado');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

// Cuando me desconecto del servidor
socket.on('disconnect', () => {
  console.log('Desconectado del servidor');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});
