import { response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Subir las imágenes a un hosting independiente para poder consumirlas, hacer backups físicos...
// Se va a usar cloudinary: https://cloudinary.com/
// No es obligatorio usar este paquete porque Cloudinary también expone una API con la que se pueden subir
// las imágenes, pero con el paquete es aún más fácil.
// https://www.npmjs.com/package/cloudinary
import { v2 as cloudinary } from 'cloudinary';

import { Usuario, Producto } from '../models/index.js';

import { subirArchivo } from '../helpers/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Para que cloudinary sepa que usuario es
cloudinary.config(process.env.CLOUDINARY_URL);

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

// Clodinary - Actualizar imagen del usuario o producto.
export const actualizarArchivoCloudinary = async (req, res = response) => {
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
    // Solo necesitamos el identificador único de la imagen que nos da Cloudinary.
    // Pero ese id no lo tenemos en BD. En BD tenemos la secure_url (path) que contiene ese id.
    // Hay que extraerlo.
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    // Podríamos poner await, pero no necesitamos esperar que se borre.
    cloudinary.uploader.destroy(public_id);
  }

  // Subir a Cloudinary. Se indica un path que existe en mi backend.
  // En concreto, el objeto req.files.archivo contiene:
  //   data: <Buffer>   --> Esto se podría enviar. Es la data de la imagen.
  //   tempFilePath     --> Pero es mejor enviar esto. Es un path temporal donde se encuentra alojada mi imagen.
  // El método upload() regresa una promesa con la información de la response y de la response solo necesitamos
  // la propiedad secure_url, que contiene la url de la imagen ya en Cloudinary.
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

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

  // Mostrar imagen por defecto si no hay.
  const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImagen);
};
