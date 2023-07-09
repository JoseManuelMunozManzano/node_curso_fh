// No olvidar instalar la declaración de tipos!!
// npm i --save-dev @types/express
// Ayuda a TypeScript a saber cuáles son las firmas de cada una de las funciones...
// Esto no irá en producción porque la instalación es para desarrollo.
import express, { Application } from 'express';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ', this.port);
    });
  }
}

export default Server;
