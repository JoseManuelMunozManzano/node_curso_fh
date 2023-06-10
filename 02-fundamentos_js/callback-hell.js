const callback_hell = () => {
  return new Promise((resolve, reject) => {
    // Se llama callback hell a la problemática generada al tener un callback dentro de otro callback que está
    // dentro de otro callback... y al final no sabemos donde está qué cosa.
    console.log('\nCALLBACK HELL');

    const { empleados } = require('./data/empleados');
    const { salarios } = require('./data/salarios');

    const getEmpleado = (id, callback) => {
      const empleado = empleados.find((e) => e.id === id)?.nombre;

      if (empleado) {
        callback(null, empleado);
      } else {
        callback(`Empleado con id ${id} no existe`);
      }
    };

    const getSalario = (id, callback) => {
      // Con el carácter ? (null check operator) preguntamos si existe.
      // Si el código:  salarios.find((s) => s.id === id)
      // regresa algo que NO es undefined NI null entonces ejecuta lo que sigue, en este caso:  .salario
      const salario = salarios.find((s) => s.id === id)?.salario;

      if (salario) {
        callback(null, salario);
      } else {
        callback(`No existe salario para el id ${id}`);
      }
    };

    const id = 3;

    getEmpleado(id, (err, empleado) => {
      if (err) {
        console.log('Error');
        return console.log(err);
      }

      console.log('Empleado existe');
      console.log(empleado.nombre);
    });

    getSalario(id, (err, salario) => {
      if (err) {
        return console.log(err);
      }

      console.log(salario);
    });

    console.log();

    //? Si ahora necesitamos obtener primero el nombre del usuario y después concatenarle su salario junto al id
    //? tenemos que hacer un código "raro"
    //
    // Es difícil saber en qué punto se está generando el empleado, y podríamos tener otro callback dentro de getSalario...
    // Es decir, callbacks llamando otros callbacks...
    // El código es muy difícil de leer y de mantener.
    //
    // HAY QUE EVITAR ESTE TIPO DE CODIGO!!!!
    getEmpleado(id, (err, empleado) => {
      if (err) {
        console.log('Error');
        return console.log(err);
      }

      getSalario(id, (err, salario) => {
        if (err) {
          return console.log(err);
        }

        console.log('El empleado:', empleado, 'tiene un salario de:', salario);
      });
    });

    resolve();
  });
};

module.exports = { callback_hell };
