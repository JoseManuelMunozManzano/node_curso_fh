const promesas = () => {
  return new Promise((resolve, reject) => {
    console.log('\nPROMESAS');

    const { empleados } = require('./data/empleados');
    const { salarios } = require('./data/salarios');

    // No hace falta el argumento callback
    const getEmpleado = (id) => {
      // La promesa recibe un argumento que es el callback.
      // El callback tiene dos argumentos, el resolve y el reject.
      // El resolve es un callback que se llama cuando todo acaba correctamente.
      // El reject se va a ejecutar si sucede un error, por ejemplo si el empleado no existe.
      //
      // Al cuerpo del callback se le conoce como cuerpo de la promesa.
      // NO OLVIDAR DEVOLVER LA PROMESA, ya sea asignando el new Promise a una constante y retornándola
      // o retornando directamente new Promise.
      return new Promise((resolve, reject) => {
        const empleado = empleados.find((e) => e.id === id)?.nombre;
        empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
      });
    };

    const getSalario = (id) => {
      return new Promise((resolve, reject) => {
        const salario = salarios.find((s) => s.id === id)?.salario;
        salario ? resolve(salario) : reject(`No existe salario con id ${id}`);
        console.log();
      });
    };

    const id = 3;
    // El resolve va al then() y el reject va al catch()
    // Se puede incluir un finally() que se ejecuta independientemente de que se resuelva o no la promesa.
    //
    // Este código es mucho más limpio que el uso de callbacks, más fácil de leer y de mantener.
    getEmpleado(id)
      .then((empleado) => console.log(empleado))
      .catch((err) => console.log(err))
      .finally(() => console.log('Esto siempre se ejecuta'));

    getSalario(id)
      .then((salario) => console.log(salario))
      .catch((err) => console.log(err));

    // Ahora, queremos que SI EXISTE EMPLEADO se lance la ejecución del salario.
    // Y ESTO SE VE BASTANTE MAS FEO QUE LOS CALLBACKS!!!! PODRIA LLAMARSE PROMISE HELL!
    //
    // SOLUCION: Trabajar promesas en cadena. Ver promesas-cadena.js
    getEmpleado(id)
      .then((empleado) => {
        getSalario(id)
          .then((salario) => {
            console.log('El empleado:', empleado, 'tiene un salario de:', salario);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    resolve();
  });
};

module.exports = { promesas };
