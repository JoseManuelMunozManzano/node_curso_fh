import { response } from 'express';
import bcryptjs from 'bcryptjs';

import { Usuario } from '../models/usuario.js';

export const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        // La parte - correo la pongo con fines didácticos, en desarrollo, para saber que fue mal.
        // Pero en una app real NO SE PONE.
        // EN LA AUTENTICACION NO SE DAN PISTAS DE LO QUE FALLA.
        msg: 'Usuario / Password no son correctos - correo',
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false',
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    // Generar el JWT

    res.json({
      msg: 'Login ok',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};
