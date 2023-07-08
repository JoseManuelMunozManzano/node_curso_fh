import { Router } from 'express';
import { body } from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/index.js';

import { googleSignIn, login, renovarToken } from '../controllers/auth.js';

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

router.post('/google', [body('id_token', 'id_token es necesario').not().isEmpty(), validarCampos], googleSignIn);

// Lo llamamos renovarJWT porque lo voy a leer y si todo es correcto voy a generar uno nuevo,
// por si acaso la persona quiere prolongar la vida del token...
router.get('/', validarJWT, renovarToken);
