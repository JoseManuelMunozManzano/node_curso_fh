import express from 'express';
import cors from 'cors';

import { router } from '../routes/usuarios.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usuariosPath = '/api/usuarios';

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
