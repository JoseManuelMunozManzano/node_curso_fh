import express from 'express';
import cors from 'cors';

// Instalación e importación de socket.io
// https://www.npmjs.com/package/socket.io
// npm install socket.io
// Para confirmar que está todo bien instalado, ejecutar la app y, en un navegador, indicar la siguiente ruta:
// http://localhost:8080/socket.io/socket.io.js
// Si se ve el código de la librería en el navegador entonces es que todo está correcto.
import { createServer } from 'http';
import { Server as ServerIo } from 'socket.io';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // Creo el server usando http, pasándole mi servidor de Express.
    // Ese es el server que tenemos que levantar, no el de Express.
    // El io es toda la información de los sockets conectados.
    this.server = createServer(this.app);
    this.io = new ServerIo(this.server); // Socket.io: Servidor de sockets

    this.paths = {};

    // Middlewares: Funciones que añaden nueva funcionalidad a mi webserver
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();

    // Sockets
    // Configuración para todos los eventos de WebSocket
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    // Ahora para la ruta / se sirve index.html incluido en el directorio public.
    this.app.use(express.static('public'));
  }

  // Se crea el directorio routes para las rutas.
  routes() {}

  // Configuración de sockets
  // https://socket.io/docs/v4/
  sockets() {
    // this.io hace referencia a nuestro servidor de sockets, el cual es diferente
    // a nuestra aplicación de Express (this.app), pero están conectados.
    // Son como dos mundos separados pero conectados.
    // Ver cliente (public/js/socket-client.js) para ver como se conecta.
    this.io.on('connection', (socket) => {
      // Aunque tenemos un id, estos son muy volátiles (cambian al recargar el navegador)
      // y nosotros no debemos usarlos. Es solo para manejo interno de socket.io
      console.log('Cliente conectado', socket.id);

      // Se maneja automáticamente la desconexión, es decir, si en el navegador hay una conexión y recargo,
      // socket.io desconecta el cliente y lo vuelve a conectar.
      socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id);
      });

      // Escuchando
      socket.on('enviar-mensaje', (payload) => {
        console.log(payload);
      });
    });
  }

  // Dejando listo el proyecto para desplegar en Railway.
  // Se ha indicado en package.json el script start y aquí indicamos el host 0.0.0.0
  listen() {
    // Como hemos indicado, el servidor que tenemos que levantar es el de http (this.server), no el de Express (this.app)
    this.server.listen(this.port, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
