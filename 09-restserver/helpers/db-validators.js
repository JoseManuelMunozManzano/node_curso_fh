import { Categoria, Producto, Role, Usuario } from '../models/index.js';

export const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    // Este error no termina el programa. Es un error personalizado que será atrapado en el custom.
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

export const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya está registrado en la BD`);
  }
};

export const usuarioExistePorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validadores de Categoría
 */
export const categoriaExistePorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validadores de Producto
 */
export const productoExistePorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
export const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no es permitida - ${colecciones}`);
  }

  // Como a esta función se la llama con paréntesis y parámetros desde uploads.router tenemos
  // que indicar el return a true.
  // En las otras funciones de arriba realmente deberíamos haberlo hecho también, pero
  // es implícito.
  return true;
};
