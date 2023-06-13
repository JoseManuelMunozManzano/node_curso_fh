import 'colors';

import { inquirerMenu, pausa, leerInput } from './helpers/inquirer.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import Tareas from './models/tareas.js';

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer las tareas
  }
  await pausa();

  do {
    // Imprimir menú.
    // También limpia la consola.
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;

      case '2':
        console.log(tareas.listadoArr);
        break;
    }

    // guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
