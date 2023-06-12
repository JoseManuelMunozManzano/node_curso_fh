import 'colors';

import { inquirerMenu } from './helpers/inquirer.js';

console.clear();

const main = async () => {
  let opt = '';
  do {
    // Dejamos de usar el módulo mensajes.js para centrarnos en inquirer.js
    opt = await inquirerMenu();
  } while (opt !== '0');
};

main();
