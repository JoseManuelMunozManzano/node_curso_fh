import 'colors';

import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;

      case '2':
        console.log(tareas._listado);
        break;
    }

    await pausa();
  } while (opt !== '0');
};

main();
