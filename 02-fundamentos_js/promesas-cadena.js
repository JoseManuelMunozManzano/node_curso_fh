const promesas_cadena = () => {
  return new Promise((resolve, reject) => {
    // Resolviendo lo que hemos llamado Promise Hell
    console.log('\nPROMESAS EN CADENA');

    const { empleados } = require('./data/empleados');
    const { salarios } = require('./data/salarios');

    const getEmpleado = (id) => {
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

    // Las promesas en cadena es una forma ordenada de llamar a los then/catch de las promesas.
    // Este código es mucho más legible y mantenible.
    //
    // Lo único que no me gusta es que tenemos que crear una variable (nombre) para poder usarlo
    // en el segundo .then()
    // Esto tiene solución (ver async-await.js)
    let nombre;
    getEmpleado(id)
      .then((empleado) => {
        nombre = empleado;
        // Devolviendo el resultado de getSalario no hace falta ejecutar el then/catch aquí.
        // Estamos devolviendo otra promesa, lo que permite encadenar otro .then a nivel raiz.
        //
        // IMPORTANTISIMO EL RETURN para poder encadenar promesas.
        return getSalario(id);
      })
      // Este then se dispara con el producto de la promesa devuelta por getSalario(id)
      .then((salario) => {
        resolve(); // esto sobra en la "vida real". Es el resolve del primer Promise, para index.js
        console.log('El empleado:', nombre, 'tiene un salario de:', salario);
      })
      // Con las promesas en cadena, los catch se pueden gestionar individualmente o uno general.
      .catch((err) => {
        resolve(); // esto sobra en la "vida real". Es el resolve del primer Promise, para index.js
        console.log(err);
      });
  });
};

module.exports = { promesas_cadena };
