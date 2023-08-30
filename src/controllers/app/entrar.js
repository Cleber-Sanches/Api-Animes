
const { lerUsuarios } = require("../../utils/leitura_e_escrita_de_arquivos/lerDB");
const senhaJwt = require("../../utils/senhaJwt");
const jwt = require('jsonwebtoken')


const realizarLogin = async (req, res, next) => {
    const { senha, email } = req.body;

    if (!senha && !email) {
        return res.status(400).json({ mensagem: "preencha t" })
    }

    const listaUsuarios = await lerUsuarios();
    const usuario = listaUsuarios.find(usuario => usuario.email === email);

    if (!usuario) {
        return res.status(400).json({ mensagem: "Email ou senha invalido" })
    };

    if (usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Email ou senha invalido" })
    };

    const { id, nome } = usuario
    const token = jwt.sign({ id, nome, email }, senhaJwt, { expiresIn: "8h" });

    return res.status(200).json({ token, usuario: { id, nome, email } })
    next()
}

module.exports = realizarLogin;