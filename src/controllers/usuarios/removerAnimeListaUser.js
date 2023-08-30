
const { buscarAnimeEValidar } = require("../../services/sistemaDeBusca.service");
const { escreverAnimeUser } = require("../../utils/leitura_e_escrita_de_arquivos/escreverDB");
const { lerAnimesUser } = require("../../utils/leitura_e_escrita_de_arquivos/lerDB");

const validarEEncontrarListaDoUsuario = async (id) => {
    const listaDeAnimesUsuario = await lerAnimesUser();
    const usuario = listaDeAnimesUsuario.find(user => user.userId === id);

    if (!usuario) {
        return null;
    }

    return {
        usuario,
        listaDeAnimesUsuario
    };
};


const removerAnimeListaUsuario = async (req, res) => {
    if (!req.usuario) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const { idOuNome } = req.params;
    const { id } = req.usuario;

    try {
        const listaUsuario = await validarEEncontrarListaDoUsuario(id);

        const animeEncontrado = await buscarAnimeEValidar(idOuNome);

        if (!animeEncontrado) {
            return res.status(400).json({ mensagem: "Anime não encontrado." });
        }

        const { lista } = listaUsuario.usuario;

        const animeJaExisteNaLista = lista.some(anime => {
            const encontrado = Array.isArray(animeEncontrado) ? animeEncontrado[0] : animeEncontrado;
            const mesmoAnimeID = anime.animeID === encontrado.animeID;
            const mesmoNome = anime.nome === encontrado.data.nome;
            return mesmoAnimeID || mesmoNome;
        });

        if (!animeJaExisteNaLista) {
            return res.status(400).json({ mensagem: "Anime não encontrado na sua lista." });
        }

        const animeIndice = lista.findIndex(anime => {
            const encontrado = Array.isArray(animeEncontrado) ? animeEncontrado[0] : animeEncontrado;
            return anime.animeID === encontrado.animeID;
        });

        const { listaDeAnimesUsuario, usuario } = await validarEEncontrarListaDoUsuario(id);

        usuario.lista.splice(animeIndice, 1);
        await escreverAnimeUser(listaDeAnimesUsuario);

        return res.status(200).json({ mensagem: `O anime foi removido da sua lista.` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Falha ao remover o anime da sua lista." });
    }
};

module.exports = {
    removerAnimeListaUsuario,
};