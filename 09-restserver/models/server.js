// Express basado en clases, para organizarlo todo mejor.
import express from 'express';

export class Server {
  constructor() {
    // Al crear una instancia de Server, vamos a crear la aplicación de express aquí como una propiedad
    // de la clase Server.
    this.app = express();
    // Una vez importado dotenv las variables de entorno son globales a toda la aplicación.
    this.port = process.env.PORT || 8080;

    // Llamando a la configuración de rutas.
    this.routes();
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello World');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
