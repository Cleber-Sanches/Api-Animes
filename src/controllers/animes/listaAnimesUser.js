const { lerAnimesUser } = require("../../utils/leitura_e_escrita_de_arquivos/lerDB");


const listarAnimesUser = async (req, res) => {
    try {
        if (!req.usuario) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }
        const listaDeAnimes = await lerAnimesUser();

        const { id } = req.usuario;

        const listaUser = listaDeAnimes.find(user => user.userId === id);

        if (!listaUser) {
            return res.status(404).json({ mensagem: "Nenhuma lista de animes encontrada para este usuário." });
        }

        return res.status(200).json(listaUser.lista);

    } catch (error) {
        console.error("Erro ao listar animes do usuário:", error);
        return res.status(500).json({ mensagem: "Ocorreu um erro interno ao listar os animes do usuário." });
    }
}

module.exports = listarAnimesUser;