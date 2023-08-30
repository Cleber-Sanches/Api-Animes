const jwt = require('jsonwebtoken');
const senhaJwt = require("../utils/senhaJwt");
const { lerUsuarios } = require('../utils/leitura_e_escrita_de_arquivos/lerDB');

const ERROR_MESSAGES = {
    TOKEN_NOT_PROVIDED: "Token não informado",
    TOKEN_INVALID: "Token inválido",
    USER_NOT_FOUND: "Usuário não encontrado"
};

const autenticacaoUsuario = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: ERROR_MESSAGES.TOKEN_NOT_PROVIDED });
    }

    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, senhaJwt);

        const usuarios = await lerUsuarios();
        const usuario = usuarios.find(usuario => usuario.id === id);

        if (!usuario) {
            return res.status(401).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.error(error); 
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expirado" });
        }
        return res.status(401).json({ error: ERROR_MESSAGES.TOKEN_INVALID });
    }
};

module.exports = autenticacaoUsuario;