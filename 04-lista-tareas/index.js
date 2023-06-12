import 'colors';
import { mostrarMenu, pausa } from './helpers/mensajes.js';

console.clear();

// Vamos a trabajar con procesos asíncronos, con async-await.
// Para poder usar await (antes, ahora ya es posible) vamos a crear una función async
const main = async () => {
  console.log('Hola Mundo');

  let opt = '';
  do {
    opt = await mostrarMenu();

    // PROBLEMA: Cuando se ejecuta mostrarMenu(), ahí hay un callback y lo pone en la cola de callbacks.
    //   En pausa() hay otro callback donde se crea otra instancia de readline y está tomando esta última,
    //   haciendo que el primer callback no llegue a ejecutarse.
    //   Tenemos que esperar a que la persona ingrese la opción en el callback de mostrarMenu ANTES de
    //   ejecutar el callback de pausa()
    //
    // SOLUCION: Promises!! tanto en mostrarMenu() para que me dé tiempo a escribir la opción como en pausa()
    if (opt !== '0') {
      await pausa();
    }
  } while (opt !== '0');
};

main();
