import { Request, Response } from 'express';

import Usuario from '../models/usuario.js';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id); // o .findOne({ where: { id } });

  if (usuario) {
    res.json({ usuario });
  } else {
    res.status(404).json({
      msg: `No existe el usuario con el id ${id}`,
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({ where: { email: body.email } });
    if (existeEmail) {
      return res.status(400).json({
        msg: 'Ya existe un usuario con el email ' + body.email,
      });
    }

    const usuario = await Usuario.create(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: 'No existe un usuario con el id ' + id,
      });
    }

    // Para no hacer muy grande esta función NO se va a incluir la validación de email.

    await Usuario.update(body, { where: { id } });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      msg: 'No existe un usuario con el id ' + id,
    });
  }

  // Eliminación física
  //
  // await Usuario.destroy({
  //   where: {
  //     id,
  //   },
  // });

  // Eliminación lógica
  //
  await Usuario.update({ estado: false }, { where: { id } });

  res.json(usuario);
};
