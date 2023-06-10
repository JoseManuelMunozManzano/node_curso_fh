const async_await = () => {
  return new Promise((resolve, reject) => {
    // await dice: Espera hasta que tenga la respuesta de la promesa. Cuando la tenga, asignas esa respuesta
    //   donde sea que yo la necesite.
    //
    // async consiste en transformar una función en una función que devuelve una promesa.
    //
    // El await deberá estar dentro de una función asíncrona (la parte async)
    console.log('\nASYNC - AWAIT');

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

    // Esto es muy fácil de leer y de mantener.
    // Función asíncrona --> devuelve una promesa
    const getInfoUsuario = async (id) => {
      try {
        // El await es para una función que trabaje con una promesa. No hace falta el .then
        // El resolve de la promesa getEmpleado se asignará a la constante empleado. Igual para salario.
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        // Este return indica que la promesa se resolvio correctamente (resolve)
        return `El salario del empleado: ${empleado} es de ${salario}`;
      } catch (error) {
        // Este return indica que la promesa getEmpleado o getSalario se rechazó (reject),
        // pero la promesa que devolvemos nosotros va al .then (resolve) igualmente porque salimos
        // correctamente.
        // return error;

        // Este throw indica que nuestra promesa se rechazó (reject) y va al .catch
        throw error;
      }

      // NOTA: Es decir, en nuestra función async, un return es un resolve siempre, y un throw es un reject.
    };

    // Al llamar a la función tengo el then (return del try y del catch) y el catch (solo para throw) ya que,
    // como se ha dicho, async devuelve una promesa.
    const id = 13;
    getInfoUsuario(id)
      .then((msg) => {
        console.log('TODO BIEN!');
        console.log(msg);
      })
      .catch((err) => {
        console.log('TODO MAL!!!!');
        console.log(err);
      });

    // Este resolve es del return new Promise() de arriba del todo, para el index.js
    resolve();
  });
};

module.exports = { async_await };
