// Dejamos el punto de inicio de la aplicación lo más vacío posible, llevándonos la lógica
// a otros fuentes e importando lo necesario.
import { crearArchivo } from './helpers/multiplicar.js';

// Para limpiar la consola automáticamente antes de mostrar el resultado.
console.clear();

// Argumentos que vienen de la consola:
//
// Si ejecutamos la siguiente llamada:
//      npm start
// Nos devuelve un array con 2 elementos:
//
// [
//  '/Users/jmmm/.nvm/versions/node/v19.4.0/bin/node',
//  '/Users/jmmm/Programacion/Udemy - Node De Cero a Experto - Fernando Herrera/00-Proyectos/03-bases-node/index.js',
// ];
//
// Si ejecutamos la siguiente llamada:
//     npm start -- --base=9
// Entonces el array contiene estos 3 elementos:
//
// [
//   '/Users/jmmm/.nvm/versions/node/v19.4.0/bin/node',
//   '/Users/jmmm/Programacion/Udemy - Node De Cero a Experto - Fernando Herrera/00-Proyectos/03-bases-node/index.js',
//   '--base=9',
// ];
//
// Por tanto, nuestros argumentos siempre comienzan en la posición 2 del array.
console.log(process.argv);
// Usando la desestructuración obtenemos los argumentos que me interesan.
const [, , arg3] = process.argv;

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
// const base = 5;
// crearArchivo(base)
//   .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
//   .catch((err) => console.log(err));
