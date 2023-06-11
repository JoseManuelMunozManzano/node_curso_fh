import { crearArchivo } from './helpers/multiplicar.js';
import { argv } from './config/yargs.js';

// Para limpiar la consola automáticamente antes de mostrar el resultado.
console.clear();

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
crearArchivo(argv.b, argv.l)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
