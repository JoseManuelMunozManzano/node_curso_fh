import 'colors';

import { inquirerMenu, pausa } from './helpers/inquirer.js';
import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';

const main = async () => {
  let opt = '';
  do {
    // opt = await inquirerMenu();

    const tareas = new Tareas();
    const tarea = new Tarea('Comprar comida');

    tareas._listado[tarea.id] = tarea;
    console.log(tareas);

    await pausa();
  } while (opt !== '0');
};

main();
