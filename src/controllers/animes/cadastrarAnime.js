

const { obterProximoID, inicializarIDs } = require('../../services/gerenciadorID.service');
const { escreverAnimeDB, escreverId } = require('../../utils/leitura_e_escrita_de_arquivos/escreverDB');
const { lerAnimesDB, lerID } = require('../../utils/leitura_e_escrita_de_arquivos/lerDB');

const registrarAnime = async (req, res) => {
    const {
        nome,
        episodios,
        status,
        dia_horario_transmissao,
        generos,
        duracaoPorEp
    } = req.body;



    const entradasObrigatorias = [nome, episodios, status, generos, duracaoPorEp];
    const verificarEntradasObrigatorias = entradasObrigatorias.every(entrada => entrada !== "" && entrada !== null && entrada !== undefined);

    if (!verificarEntradasObrigatorias) {
        return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios" });
    }

    try {
        await inicializarIDs()
        const listaAnimes = await lerAnimesDB();

        const animeCadastrado = listaAnimes.find(anime => anime.data.nome.toLowerCase() === nome.toLowerCase());

        if (animeCadastrado) {
            return res.status(400).json({ mensagem: "Anime já cadastrado" });
        }

        const novoAnime = {
            animeID: await obterProximoID(),
            data: {
                nome,
                episodios,
                status,
                dia_horario_transmissao: dia_horario_transmissao || "Não definido",
                duracaoPorEp: duracaoPorEp || 24,
                generos
            }
        };

        listaAnimes.push(novoAnime);
        await escreverAnimeDB(listaAnimes);

        return res.status(201).json({ mensagem: "Anime cadastrado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno" });
    }
}

module.exports = {
    registrarAnime
};





