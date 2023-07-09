var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Usuario from '../models/usuario.js';
export const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield Usuario.findAll();
    res.json({ usuarios });
});
export const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario.findByPk(id); // o .findOne({ where: { id } });
    if (usuario) {
        res.json({ usuario });
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`,
        });
    }
});
export const postUsuario = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postUsuarios',
        body,
    });
};
export const putUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'putUsuario',
        body,
        id,
    });
};
export const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUsuario',
        id,
    });
};
//# sourceMappingURL=usuario.js.map