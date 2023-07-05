import express from 'express';
import cors from 'cors';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.paths = {};

    // Middlewares: Funciones que añaden nueva funcionalidad a mi webserver
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();
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

  // Dejando listo el proyecto para desplegar en Railway.
  // Se ha indicado en package.json el script start y aquí indicamos el host 0.0.0.0
  listen() {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
