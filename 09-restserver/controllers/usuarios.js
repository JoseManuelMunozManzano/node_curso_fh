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
export const usuariosGet = (req = request, res = response) => {
  // Obteniéndo los query parameters con desestructuración para obtener lo que realmente me interesa.
  // Y puedo indicar valores por defecto, lo que está muy bien para paginación
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

  // También es posible
  // const query = req.query;

  res.json({
    msg: 'get API - controlador',
    //query,
    q,
    nombre,
    apikey,
    page,
    limit,
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

  // TODO: Verificar si el correo existe

  // Encriptar la contraseña.
  // salt por defecto es 10
  // npm i bcryptjs
  // hashSync encripta en una sola vía.
  // La contraseña cae en usuario.password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // TODO: No devolver en la respuesta JSON el password

  // Grabando el registro en Mongo.
  await usuario.save();

  res.status(201).json({
    msg: 'post API - controlador',
    usuario,
  });
};

// Obtener parámetros de segmento.
// Los obtenemos de req.params y se recuperan como string.
export const usuariosPut = (req, res) => {
  const { id } = req.params;
  // Esto también vale
  //const id = req.params.id;

  res.json({
    msg: 'put API - controlador',
    id,
  });
};

export const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - controlador',
  });
};

export const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete API - controlador',
  });
};
