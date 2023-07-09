// No olvidar instalar la declaración de tipos!!
// npm i --save-dev @types/express
// Ayuda a TypeScript a saber cuáles son las firmas de cada una de las funciones...
// Esto no irá en producción porque la instalación es para desarrollo.
import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/usuario.js';
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
        };
        this.app = express();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura del body (parseo)
        this.app.use(express.json());
        // Carpeta pública
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}
export default Server;
//# sourceMappingURL=server.js.map