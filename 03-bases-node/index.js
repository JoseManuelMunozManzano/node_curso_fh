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

// Ahora, usando desestructuración, obtenemos ese tercer elemento del array, y de el, el valor numérico de base.
//! ESTA FORMA ES PARA VERLO RAPIDO, CON FINES EDUCATIVOS, PERO TIENE MUCHOS PROBLEMAS. NO HACERLO ASI NUNCA!!!
// En concreto, un problema sería que los argumentos los estamos tratando por posición, y en esa posición
// puede que me envíen otro argumento en vez de base, si el programa admite más de un argumento,
// y lo va a tratar como la base.
// Otro problema es que podemos tener nombres cortos para el argumento o no indicar el igual.
// Por ejemplo nos valdrían: --base=5, -b=5 y --base 5
//
// Y otro añadido importante sería la posibilidad de tener esa documentación, cómo se puede usar nuestra aplicación.
//
// Ya existe un paquete para manejar todo eso, llamado yargs
const [, , arg3 = 'base=5'] = process.argv;
const [, base = 5] = arg3.split('=');

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
crearArchivo(base)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
