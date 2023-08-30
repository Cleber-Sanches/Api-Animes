const { v4: uuidv4 } = require('uuid');

const { escreverAnimeUser, escreverUsuario } = require('../../utils/leitura_e_escrita_de_arquivos/escreverDB');


const { lerUsuarios, lerAnimesUser } = require('../../utils/leitura_e_escrita_de_arquivos/lerDB');



const criarListaVaziaUsuario = async (id, email) => {
    const listaAnimesUsuarios = await lerAnimesUser();

    const novoUsuario = {
        email,
        userId: id,
        lista: []
    }

    listaAnimesUsuarios.push(novoUsuario);
    await escreverAnimeUser(listaAnimesUsuarios)
}

const criarNovaConta = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'Nome obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'Email obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha obrigatório' });
    }

    try {
        const listaUsuarios = await lerUsuarios()
        console.log(listaUsuarios)
        const usuarioExiste = await listaUsuarios.find(usuario => usuario.email === email)
        console.log(usuarioExiste)
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const novoUsuario = {
            id: uuidv4(),
            nome: nome,
            email: email,
            senha: senha
        };

        listaUsuarios.push(novoUsuario);

        await escreverUsuario(listaUsuarios);

        await criarListaVaziaUsuario(novoUsuario.id, novoUsuario.email)

        return res.status(201).json({ mensagem: 'Conta criada com sucesso!' })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: 'Erro ao criar conta!' })
    }

}

module.exports = criarNovaConta;