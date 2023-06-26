// Esto se importa más que nada para tener la ayuda de VSCode con el autocompletado.
// En TypeScript no haría falta.
import { response, request } from 'express';
import bcryptjs from 'bcryptjs';

// Los modelos se usan en el controlador.
import { Usuario } from '../models/usuario.js';

// Query Parameters
// Son los que se encuentran en la ruta tras una interrogación.
// Ejemplo:  http://localhost:8080/api/usuarios?q=hola&nombre=joseManuel&apikey=123456
// En este caso los query params son: q, nombre y apikey
// Express los parsea por nosotros sin tener que hacer nada.
// Para recuperarlos accedemos a req.query
export const usuariosGet = async (req = request, res = response) => {
  // Obteniéndo los query parameters con desestructuración para obtener lo que realmente me interesa.
  // Y puedo indicar valores por defecto, lo que está muy bien para paginación
  // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

  // También es posible
  // const query = req.query;

  const { limite = 5, desde = 0 } = req.query;

  // Solo debemos trabajar con registro con estado a true. Los estado a false están de baja.
  const query = { estado: true };

  // const usuarios = await Usuario.find(query).skip(desde).limit(limite);

  // Esto es mala praxis. El problema es que arriba tenemos un await, por lo que tenemos que esperar
  // a que se realice el find antes de hacer este conteo de registros, que también es await.
  // Si el find de arriba tarda 2 sg y este conteo tarda otros 2 sg, ya van 4 sg, es mucho tiempo.
  // Pero lo importante, es que estas 2 consultas NO DEPENDEN UNA DE OTRA, por lo que no tenemos
  // por qué esperar a que se haga el find para hacer el conteo.
  // Lo que si es necesario es que ambas sean bloqueantes (await) porque no queremos devolver la
  // respuesta antes de que terminen de hacerse las consultas.
  //
  // const total = await Usuario.countDocuments(query);

  // Para solucionar este problema, se usa un Promise.all, que permite mandar un array con todas
  // las promesas que queremos ejecutar. Si una da error, las demás también terminan en error.
  // Y ponemos el await para que espera a la resolución de ambas promesas.
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    total,
    usuarios,
  });
};

export const usuariosPost = async (req, res) => {
  // Extrayendo el body de la request.
  // Habría que hacer una limpieza de la información para evitar que vengan scripts o inyección maliciosa...
  // Esto lo vamos a ver después.
  // Es muy común desestructurar lo que necesitamos del body. Sería una pequeña validación para recoger lo que realmente queremos.
  const { nombre, correo, password, rol } = req.body;

  // Creando instancia de nuestro modelo.
  // Solo los campos que están definidos en el modelo se pasan a la instancia usuario.
  // Con esto evitamos inyecciones maliciosas...
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña.
  // salt por defecto es 10
  // npm i bcryptjs
  // hashSync encripta en una sola vía.
  // La contraseña cae en usuario.password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Grabando el registro en Mongo.
  await usuario.save();

  res.status(201).json({
    msg: 'post API - controlador',
    usuario,
  });
};

// Obtener parámetros de segmento.
// Los obtenemos de req.params y se recuperan como string.
export const usuariosPut = async (req, res) => {
  const { id } = req.params;

  // Desestructuro porque no quiero actualizar google y el password hay que actualizarlo con encriptación.
  // Lo demás si es susceptible de actualizarse de forma normal.
  // Validación: Quitamos también _id porque eso lo maneja Mongo. Si lo han intentado actualizar, aquí lo excluimos.
  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json(usuario);
};

export const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - controlador',
  });
};

export const usuariosDelete = async (req, res) => {
  const { id } = req.params;

  // En el request tenemos el uid porque lo hemos añadido en el middleware validarJWT.
  // const uid = req.uid;

  // Borrado físico: Se indica por motivos de aprendizaje porque lo suyo
  // es NO borrar registros, sino ponerlos con un status a false, para
  // indicar que no hay que tener en cuenta ese registro y a la vez no
  // perder la integridad referencial.
  //
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Cambiando estado del usuario
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

  // res.json({ usuario, uid });
  res.json(usuario);
};
