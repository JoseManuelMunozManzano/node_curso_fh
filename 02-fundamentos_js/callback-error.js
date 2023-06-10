const callback_error = () =>
  new Promise((resolve, reject) => {
    // Vamos a ver un problema de los callbacks cuando se puede devolver un parámetro o un error.
    console.log('\nCALLBACK ERROR/CORRECTO');

    const { empleados } = require('./data/empleados');

    //? Sin callback, pero el console.log no lo quiero hacer así
    const getEmpleado = (id) => {
      const empleado = empleados.find((e) => e.id === id);

      if (empleado) return empleado;
      else return `Empleado con id ${id} no existe`;
    };
    console.log(getEmpleado(3));

    console.log();

    //? Con callback
    // Lo que quiero es mandar ejecutar un callback que contenga la impresión de ese empleado.
    // Cuando llamo a getEmpleado este me devuelve el empleado, que puedo usar en el callback.
    const getEmpleadoCb = (id, callback) => {
      const empleado = empleados.find((e) => e.id === id);

      if (empleado) {
        // Ok, aquí puedo usar el callback y mando como argumento el empleado.
        callback(empleado);
      } else {
        // PROBLEMA!
        // ¿Y aquí qué hago? No sé diferenciar cuando se hizo correctamente y cuando no.
        // El texto que devuelve como argumento al callback NO es un empleado.
        callback(`Empleado con id ${id} no existe`);
      }
    };

    getEmpleadoCb(10, (empleado) => {
      console.log(empleado);
    });

    console.log();

    //? Con primer argumento error y segundo callback
    // SOLUCION: Se pasa como primer argumento del callback el error y como segundo argumento,
    //    si todo fue bien, el empleado. Esto es muy común.
    const getEmpleadoErrYCb = (id, callback) => {
      const empleado = empleados.find((e) => e.id === id);

      if (empleado) {
        // No hay error (mandamos null) y mando empleado.
        callback(null, empleado);
      } else {
        // Hay error y mando empleado.
        callback(`Empleado con id ${id} no existe`);
      }
    };

    getEmpleadoErrYCb(3, (err, empleado) => {
      if (err) {
        console.log('Error');
        return console.log(err);
      }

      console.log('Empleado existe');
      console.log(empleado);
    });

    resolve();
  });

module.exports = { callback_error };
