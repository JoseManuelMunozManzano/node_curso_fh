import { response } from 'express';
import { Producto } from '../models/index.js';

export const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).skip(desde).limit(limite).populate('usuario', 'nombre').populate('categoria', 'nombre'),
  ]);

  res.json({
    total,
    productos,
  });
};

export const obtenerProductoPorId = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

  res.json(producto);
};

export const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe`,
    });
  }

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};

export const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

export const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  // Solo voy a actualizar el estado y el usuario que actualiza.
  const producto = await Producto.findByIdAndUpdate(id, { estado: false, usuario: req.usuario }, { new: true });

  res.json(producto);
};
