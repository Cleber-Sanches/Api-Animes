const { lerAnimesDB } = require("../utils/leitura_e_escrita_de_arquivos/lerDB");

const buscarPorId = async (idOuNome) => {
    try {
        const listaAnimes = await lerAnimesDB();

        const animeEncontrado = listaAnimes.find(anime => anime.animeID === Number(idOuNome) || anime.animeID === idOuNome);

        if (!animeEncontrado) {
            return ("Anime não encontrado");
        }

        return animeEncontrado;
    } catch (error) {
        throw error;
    }
};

const buscarAnimePorNome = async (q) => {
    try {
        const listaAnimes = await lerAnimesDB();
        const animesEncontrados = listaAnimes.filter(anime =>
            anime.data.nome.toLowerCase().includes(q.toLowerCase())
        );

        if (animesEncontrados.length === 0) {
            throw new Error("Nenhum anime encontrado com o nome fornecido.");
        }

        return animesEncontrados;
    } catch (error) {
        throw error;
    }
};

const buscarAnimeEValidar = async (idOuNome) => {
    let animeEncontrado;

    const idOuNomeNumero = parseInt(idOuNome);

    if (!isNaN(idOuNomeNumero)) {
        animeEncontrado = await buscarPorId(idOuNomeNumero);

    } else {
        animeEncontrado = await buscarAnimePorNome(idOuNome);

    }

    return animeEncontrado;
};



module.exports = {
    buscarPorId,
    buscarAnimePorNome,
    buscarAnimeEValidar
};