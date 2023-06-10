(() => {
  // Un callback es una función que se pasa como argumento y que se va a ejecutar depués, en cierto punto del tiempo.
  console.log('\nCALLBACKS');

  // Cuando pase 1 sg se ejecuta la función.
  //
  // setTimeout(() => {
  //   console.log('Hola Mundo');
  // }, 1000);

  // Simulación de obtención de data de una BD.
  const getUsuarioById = (id) => {
    const usuario = {
      id,
      nombre: 'José Manuel',
    };

    setTimeout(() => {
      // PROBLEMA: Todo el código lo tengo aquí, ¿pero qué pasa si necesito que ciertas partes
      //   se hagan fuera de getUsuarioByID?
      // Ver la solución abajo.
      console.log(usuario);
    }, 1000);
  };

  getUsuarioById(10);

  // SOLUCION
  // La solución al problema es un callback
  //
  // Aquí tengo como argumento un callback
  const getUsuarioById_2 = (id, callback) => {
    const user = {
      id,
      nombre: 'José Manuel',
    };

    setTimeout(() => {
      // Ahora el código que se ejecuta aquí es el callback que me han pasado.
      // Y al callback le estoy pasando como parámetro el user.
      callback(user);
    }, 1000);
  };

  // Aquí es donde paso el callback y donde estamos realizando la impresión del usuario.
  // El argumento usuario se que me lo van a pasar desde donde sea que llamen a mi callback.
  getUsuarioById_2(10, (usuario) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
  });
})();
