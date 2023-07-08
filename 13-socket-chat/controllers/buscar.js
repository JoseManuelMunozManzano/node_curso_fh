import { response } from 'express';
import { isValidObjectId } from 'mongoose';

import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js';
import { Usuario } from '../models/usuario.js';

// Si al día de mañana creamos otra colección tenemos que añadirla aquí.
const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

// Recibo la response porque aquí voy a salir.
// Vamos a buscar por el mongoId del usuario o por el nombre del usuario.
const buscarUsuarios = async (termino = '', res = response) => {
  // Si es id de mongo devuelve true
  const esMongoID = isValidObjectId(termino);

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    // Devuelvo un objeto con array, porque las distintas búsquedas tienen todas distintas apariencias.
    // Y no queremos devolver null. Si es null devolveremos array vacío.
    // E indico return para no seguir fuera del if.
    // res.json(usuario);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  // Expresión regular para poder buscar de forma insensitive, es decir, sin tener en cuenta
  // mayúculas o minúsculas.
  const regex = new RegExp(termino, 'i');

  // No es MongoId. Buscaré por una palabra, nombre o el correo.
  // find() ya regresa un arreglo vacío si no encuentra nada.
  //
  // También vemos como funcionar un or en mongoose.
  // NOTA: Esto es posible:  $or: [{ nombre: regex, estado: true }, { correo: regex, estado: true }],
  //
  // Ejemplos de búsqueda en Postman: {{url}}/api/buscar/usuarios/Test
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino, res = response) => {
  const esMongoId = isValidObjectId(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const categorias = await Categoria.find({ nombre: regex, estado: true });
  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino, res = response) => {
  const esMongoID = isValidObjectId(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate('categoria', 'nombre');
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');
  res.json({
    results: productos,
  });
};

export const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res);
      break;
    // No hago roles
    default:
      res.status(500).json({
        msg: 'Se me olvidó hacer esta búsqueda',
      });
  }
};

// Nota: Para buscar todos los productos cuya categoria sea ese ID, se puede escribir en el Filter de Mongo Compass,
// En productos:
// {categoria: ObjectId('649f0f4e72e259ffdcd79e65')}
// Por supuesto, también se puede hacer un nuevo router/controller para hacer este tipo de búsquedas.
