import 'colors';

import { inquirerMenu, pausa, leerInput, listadoTareasBorrar } from './helpers/inquirer.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import Tareas from './models/tareas.js';

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Cargar las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

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
        tareas.listadoCompleto();
        break;

      case '3': // Completadas
        tareas.listarPendientesOCompletadas(true);
        break;

      case '4': // Pendientes
        tareas.listarPendientesOCompletadas(false);
        break;

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        // TODO: preguntar si está seguro
        console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== '0');
};

main();
