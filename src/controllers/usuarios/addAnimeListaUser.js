const { format } = require("date-fns");

const { escreverAnimeUser } = require("../../utils/leitura_e_escrita_de_arquivos/escreverDB");
const { buscarAnimeEValidar } = require("../../services/sistemaDeBusca.service");
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

const adicionarAnimeListaUsuario = async (req, res) => {
    const { idOuNome } = req.params;
    const { id } = req.usuario;

    try {
        if (!idOuNome) {
            return res.status(400).json({ mensagem: 'É necessário informar o nome ou o ID do anime' });
        }

        const listaUsuario = await validarEEncontrarListaDoUsuario(id);

        if (!listaUsuario) {
            return res.status(400).json({ mensagem: "Nenhuma lista de animes encontrada para este usuário." });
        }

        const animeEncontrado = await buscarAnimeEValidar(idOuNome);

        if (!animeEncontrado || animeEncontrado.length === 0) {
            return res.status(400).json({ mensagem: "Anime não encontrado." });
        }

        const animes_encontrados = animeEncontrado
        if (animeEncontrado.length > 1) {
            return res.status(400).json({ mensagem: "Sua busca retornou vários animes. Por favor, especifique um anime para adicionar à sua lista. Você pode usar o ID do anime para adicionar um anime específico.", animes_encontrados });
        }

        const { lista } = listaUsuario.usuario;

        const animeJaExisteNaLista = lista.some(anime => {
            const encontrado = Array.isArray(animeEncontrado) ? animeEncontrado[0] : animeEncontrado;
            const mesmoAnimeID = anime.animeID === encontrado.animeID;
            const mesmoNome = anime.nome === encontrado.data.nome;
            return mesmoAnimeID || mesmoNome;
        });

        if (animeJaExisteNaLista) {
            return res.status(400).json({ mensagem: "Anime já adicionado." });
        }

        const animeEncontradoValidacao = Array.isArray(animeEncontrado) ? animeEncontrado[0] : animeEncontrado;

        const { data: { nome, episodios, dia_horario_transmissao, duracaoPorEp }, animeID } = animeEncontradoValidacao;

        const addNovoAnimeLista = {
            animeID,
            nome,
            total_episodes: episodios,
            dia_horario_transmissao,
            Status: "Assistindo",
            duracao_episodios: duracaoPorEp,
            episodio_Atual: 0,
            Data_Adicionado_Na_Lista: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };

        const { listaDeAnimesUsuario, usuario } = await validarEEncontrarListaDoUsuario(id);
        usuario.lista.push(addNovoAnimeLista);
        await escreverAnimeUser(listaDeAnimesUsuario);

        return res.status(200).json({ mensagem: `O anime foi adicionado à sua lista.` });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro ao processar a requisição." });
    }
};

module.exports = {
    adicionarAnimeListaUsuario,
};