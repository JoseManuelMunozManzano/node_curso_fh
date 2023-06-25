import { Role } from '../models/role.js';

export const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    // Este error no termina el programa. Es un error personalizado que será atrapado en el custom.
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};
