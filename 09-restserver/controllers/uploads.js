import { response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { Usuario, Producto } from '../models/index.js';

import { subirArchivo } from '../helpers/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// en req.files aparecen los ficheros que se han mandado en el body de la petición post.
// Para añadir al body un fichero en Postman, usar body y form-data.
// console.log(req.files);
export const cargarArchivo = async (req, res = response) => {
  // Para manejar el reject de la promise colocamos el await entre un try-catch
  try {
    // Ejemplo de subida de txt, md en carpeta uploads/textos
    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

// Actualizar imagen del usuario o producto.
export const actualizarArchivo = async (req, res = response) => {
  const { id, coleccion } = req.params;

  // Para actualizar solo necesito establecer la propiedad img del módelo Usuario o Producto.
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Limpiar imágenes previas
  // Primero verificamos que la propiedad img exista (esto no quiere decir que exista la imagen, ojo!)
  if (modelo.img) {
    // Hay que borrar la imagen del servidor si existe
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

export const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  // Para actualizar solo necesito establecer la propiedad img del módelo Usuario o Producto.
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Mostrar la imagen.
  // Ya vimos que hacía falta crear un endpoint porque la imagen NO la tenemos en la carpeta
  // public, por lo que no valía ni siquiera pulsar el enlace devuelto en los post/put anteriores.
  // Lo genial de esto es que estamos escondiendo la ubicación del archivo y su extensión.
  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  res.json({ msg: 'Falta placeholder' });
};
