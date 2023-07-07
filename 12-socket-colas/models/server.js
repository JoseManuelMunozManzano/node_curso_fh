import express from 'express';
import cors from 'cors';

import { createServer } from 'http';
import { Server as ServerIo } from 'socket.io';

import { socketController } from '../sockets/controller.js';

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

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static('public'));
  }

  routes() {}

  sockets() {
    this.io.on('connection', socketController);
  }

  // Dejando listo el proyecto para desplegar en Railway.
  // Se ha indicado en package.json el script start y aquí indicamos el host 0.0.0.0
  listen() {
    // El servidor que tenemos que levantar es el de http (this.server), no el de Express (this.app)
    this.server.listen(this.port, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
