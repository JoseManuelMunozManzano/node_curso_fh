export const getUsuarios = (req, res) => {
    res.json({
        msg: 'getUsuarios',
    });
};
export const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id,
    });
};
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