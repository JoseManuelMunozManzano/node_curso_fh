import { crearArchivo } from './helpers/multiplicar.js';
// https://www.npmjs.com/package/yargs
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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

// Usando yargs
//
// Si ejecutamos la siguiente llamada:
//      npm start
// Nos devuelve el siguiente objeto
//
// { _: [], '$0': 'index.js' }
//
// Si ejecutamos la siguiente llamada:
//     npm start -- --base=9
// El objeto devuelto es este:
//
// { _: [], base: 9, '$0': 'index.js' }
//
// Otra llamada sería:
//    npm start --base 9 --listar
// Que devuelve:
// { _: [], base: 9, listar: true, '$0': 'index.js' }
//
// Otra llamada sería:
//    npm start --base 9 -l
// Que devuelve:
// { _: [], base: 9, l: true, '$0': 'index.js' }
//
// También, gracias a yargs, tenemos la ayuda:
//      npm run node -- --help
// Y la versión de package.json
//      npm run node -- --version
const argv = yargs(hideBin(process.argv)).argv;
console.log(argv);
// Y para obtener un argumento mandado por consola, es muy fácil, se obtiene por su nombre:
// Lo bueno es que si hacemos la llamada:
//      npm start -- --base 9
// Funciona correctamente, devolviendo el valor 9
console.log('base: yargs', argv.base);

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
// crearArchivo(base)
//   .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
//   .catch((err) => console.log(err));
