import { response } from 'express';
import bcryptjs from 'bcryptjs';

import { Usuario } from '../models/usuario.js';

import { generarJWT } from '../helpers/generar-jwt.js';
import { googleVerify } from '../helpers/google-verify.js';

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
    // Instalado: npm i jsonwebtoken
    // Este paquete no tiene una promesa para generar el JWT, es con un callback y necesitamos transformarlo
    // a una promesa. Con eso podemos usar el await.
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    // Si el usuario no existe lo creo.
    // Podemos poner como password cualquier cosa.
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        rol: 'USER_ROLE',
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en BD tiene estado a false negaremos la autenticación en mi aplicación.
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se puedo verificar',
    });
  }
};
