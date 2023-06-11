// Dejamos el punto de inicio de la aplicación lo más vacío posible, llevándonos la lógica
// a otros fuentes e importando lo necesario.
import { crearArchivo } from './helpers/multiplicar.js';

// Para limpiar la consola automáticamente antes de mostrar el resultado.
console.clear();

//? Se va a imprimir la tabla de multiplicar y grabarla en un archivo de texto que esté en la
//? misma dirección de mi aplicación.
const base = 5;
crearArchivo(base)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
