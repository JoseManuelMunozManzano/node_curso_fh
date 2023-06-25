import { Role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';

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
