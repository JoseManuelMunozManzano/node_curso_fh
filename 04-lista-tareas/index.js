import 'colors';
import { mostrarMenu, pausa } from './helpers/mensajes.js';

console.clear();

// Vamos a trabajar con procesos asíncronos, con async-await.
// Para poder usar await (antes, ahora ya es posible) vamos a crear una función async
const main = async () => {
  console.log('Hola Mundo');
  mostrarMenu();

  // PROBLEMA: Cuando se ejecuta mostrarMenu(), ahí hay un callback y lo pone en la cola de callbacks.
  //   En pausa() hay otro callback donde se crea otra instancia de readline y está tomando esta última,
  //   haciendo que el primer callback no llegue a ejecutarse.
  //   Tenemos que esperar a que la persona ingrese la opción en el callback de mostrarMenu ANTES de
  //   ejecutar el callback de pausa()
  //
  // pausa();
};

main();
