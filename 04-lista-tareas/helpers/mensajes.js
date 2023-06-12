import { createInterface } from 'readline';
import 'colors';

export const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.green);
    console.log('==========================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea`);
    console.log(`${'0.'.green} Salir\n`);

    // Recibir información del usuario.
    const readline = createInterface({
      // Con esto Node sabe que tiene que pausar la ejecución del programa, esperando que el usuario
      // introduzca contenido y pulse Intro.
      input: process.stdin,
      // Para mostrar información en consola, cuando se le pide algo al usuario.
      output: process.stdout,
    });

    // Para mostrar con stdout la información al usuario.
    // Se ejecuta un callback cuando se termina de ejecutar el question, pasándole la opción
    // que ha indicado el usuario.
    readline.question('Seleccione una opción: ', (opt) => {
      // Obligatorio cerrar cuando terminamos
      readline.close();
      resolve(opt);
    });
  });
};

export const pausa = () => {
  return new Promise((resolve) => {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};
