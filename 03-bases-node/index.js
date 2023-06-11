import { crearArchivo } from './helpers/multiplicar.js';
// https://www.npmjs.com/package/yargs
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Para limpiar la consola automáticamente antes de mostrar el resultado.
console.clear();

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
//    npm start -- --base 9 --listar
// Que devuelve:
// { _: [], base: 9, listar: true, '$0': 'index.js' }
//
// Otra llamada sería:
//    npm start -- --base 9 -l
// Que devuelve:
// { _: [], base: 9, l: true, '$0': 'index.js' }
//
// También, gracias a yargs, tenemos la ayuda:
//      npm run node -- --help
// Y la versión de package.json
//      npm run node -- --version
//
// Configuración de yargs
// https://yargs.js.org/docs/#api-reference-optionkey-opt
// Usando option, donde primero se indica la abreviatura luego el alias y su descripción.
// Y chequeo del tipo de dato enviado
// https://yargs.js.org/docs/#api-reference-checkfn-globaltrue
const argv = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false,
    demandOption: false,
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw 'La base tiene que ser un número';
    }
    return true;
  }).argv;

console.log(argv);
// Y para obtener un argumento mandado por consola, es muy fácil, se obtiene por su nombre:
// Lo bueno es que si hacemos la llamada:
//      npm start -- --base 9
// Funciona correctamente, devolviendo el valor 9
console.log('base:', argv.b);
console.log('listar:', argv.l);

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
crearArchivo(argv.b, argv.l)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
