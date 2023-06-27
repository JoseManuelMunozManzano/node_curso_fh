import { response } from 'express';

export const esAdminRol = (req, res = response, next) => {
  // Es validar-jwt ya hemos añadido el usuario autenticado en la request, pero aquí preguntamos
  // por si acaso no se ha añadido correctamente.
  // Los errores 500 son del programador backend (los 400 del desarrollador frontend)
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(403).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

// To-dos los roles que vengan, gracias a operador rest, los va a transformar en un arreglo.
export const tieneRol = (...roles) => {
  // Esta es la función que devolvemos, como todos los middlewares, usando req, res y next.
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token primero',
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};
