import { inquirerMenu, leerInput, pausa } from './helpers/inquirer.js';

const main = async () => {
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        console.log('Seleccionada opción 1');
        break;

      case 2:
        console.log('Seleccionada opción 2');
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
