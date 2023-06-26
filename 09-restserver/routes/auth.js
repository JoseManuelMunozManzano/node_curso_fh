import { Router } from 'express';
import { body } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos.js';

import { login } from '../controllers/auth.js';

// Es a este router al que se le van a configurar las rutas.
export const router = Router();

router.post(
  '/login',
  [
    body('correo', 'El correo es obligatorio').isEmail(),
    // Solo se indica que debe venir la contraseña porque no queremos dar pistas de como luce una contraseña en nuestra app.
    body('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);
