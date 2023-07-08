import { Router } from 'express';

import { buscar } from '../controllers/buscar.js';

export const router = Router();

// Las peticiones de búsqueda son GET
router.get('/:coleccion/:termino', buscar);
