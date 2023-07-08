// Express basado en clases, para organizarlo todo mejor.
import express from 'express';
// Para que solo ciertas páginas, o todo el mundo porque se va a proteger de cierta manera, puedan acceder a mi API
// instalaremos un paquete llamado cors.
// Básicamente cors (cross-origin access record) permite proteger nuestro servidor de una manera superficial.
// No es muy útil configurar CORS si la API está en la red interna de la empresa, es decir, no se expone al exterior.
// Se pueden crear listas blancas para dar acceso a nuestro endpoint desde esas urls.
// Indicar que Postman se salta el CORS, por lo que para probar que CORS está configurado habría que hacer una petición
// desde el front de React o Angular...
// https://www.npmjs.com/package/cors
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { createServer } from 'http';
import { Server as ServerIo } from 'socket.io';

import { router as userRoute } from '../routes/usuarios.js';
import { router as buscarRoute } from '../routes/buscar.js';
import { router as authRoute } from '../routes/auth.js';
import { router as productosRouter } from '../routes/productos.js';
import { router as categoriasRouter } from '../routes/categorias.js';
import { router as uploadsRouter } from '../routes/uploads.js';
import { dbConnection } from '../database/config.js';

import { socketController } from '../sockets/controller.js';

export class Server {
  constructor() {
    // Al crear una instancia de Server, vamos a crear la aplicación de express aquí como una propiedad
    // de la clase Server.
    this.app = express();
    // Una vez importado dotenv las variables de entorno son globales a toda la aplicación.
    this.port = process.env.PORT || 8080;

    // Creo el server usando http, pasándole mi servidor de Express.
    // Ese es el server que tenemos que levantar, no el de Express.
    // El io es toda la información de los sockets conectados.
    this.server = createServer(this.app);
    this.io = new ServerIo(this.server); // Socket.io: Servidor de sockets

    // Es un poco difícil ver las rutas de la aplicación, por lo que se incluye aquí, para que otros
    // desarrolladores que vengan a ver mi servidor puedan ver las rutas disponibles.
    //
    // Cuando ya hay muchas rutas, también se suelen indicar en un objeto.
    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      uploads: '/api/uploads',
      usuarios: '/api/usuarios',
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares: Funciones que añaden nueva funcionalidad a mi webserver
    this.middlewares();

    // Rutas de mi aplicación.
    this.routes();

    // Sockets
    this.sockets();
  }

  async conectarDB() {
    // Aquí podría leerse de process.env una variable de entorno para saber si estamos en desarrollo o producción
    // y con un if crearnos otra conexión diferente.
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // ¿Cómo se recibe la información del body de una petición POST, PUT ...?
    // Hay que configurar un middleware para decir que la información que viene hacia el backend mediante una
    // petición POST, PUT o DELETE va a venir en formato JSON.
    // Si la información va a venir en XML... habrá que configurar otros middlewares, pero lo normal es comunicarnos con JSON.
    // Lectura y parseo del body.
    this.app.use(express.json());

    // Directorio público
    // Ahora para la ruta / se sirve index.html incluido en el directorio public.
    this.app.use(express.static('public'));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        // Crea carpeta si no existe.
        createParentPath: true,
      })
    );
  }

  // Se va a separar las rutas del controlador.
  // Esto es porque puede que haya rutas que necesiten autenticación y se le podría aplicar un middleware a todas las rutas.
  // Y también para tener un archivo especial de rutas y otro de controladores de esas rutas por facilidad de mantenimiento.
  // Se crea el directorio routes para las rutas.
  routes() {
    // Middleware condicional para cargar las rutas.
    this.app.use(this.paths.auth, authRoute);
    this.app.use(this.paths.buscar, buscarRoute);
    this.app.use(this.paths.categorias, categoriasRouter);
    this.app.use(this.paths.productos, productosRouter);
    this.app.use(this.paths.uploads, uploadsRouter);
    this.app.use(this.paths.usuarios, userRoute);
  }

  sockets() {
    // Pasamos el io también.
    this.io.on('connection', (socket) => socketController(socket, this.io));
  }

  // Dejando listo el proyecto para desplegar en Railway.
  // Se ha indicado en package.json el script start y aquí indicamos el host 0.0.0.0
  listen() {
    // El servidor que tenemos que levantar es el de http (this.server), no el de Express (this.app) que no tiene nada de sockets.
    this.server.listen(this.port, '0.0.0.0', () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}
