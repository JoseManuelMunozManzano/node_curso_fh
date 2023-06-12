// https://www.npmjs.com/package/inquirer
import inquirer from 'inquirer';
import 'colors';

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: ['opt1', 'opt2', 'opt3'],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log('=========================='.green);
  console.log('  Seleccione una opción'.green);
  console.log('==========================\n'.green);

  const opt = await inquirer.prompt(preguntas);

  return opt;
};
