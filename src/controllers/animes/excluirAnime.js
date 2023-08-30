const { lerAnimesDB } = require('../../utils/leitura_e_escrita_de_arquivos/lerDB');
const { escreverAnimeDB } = require('../../utils/leitura_e_escrita_de_arquivos/escreverDB');


const excluirAnime = async (req, res) => {
    const { idOuNome } = req.params;
    if (!idOuNome) {
        return res.status(400).json({
            mensagem: 'Nome ou ID não informado!'
        });
    }


    try {
        const listaAnimes = await lerAnimesDB();

        const anime = listaAnimes.find((anime) => anime.animeID === Number(idOuNome));
        console.log(anime);
        if (!anime) {
            return res.status(400).json({
                mensagem: 'Anime não encontrado!'
            });
        }

        const indiceAnime = listaAnimes.findIndex((anime) => anime.animeID === Number(idOuNome));

        listaAnimes.splice(indiceAnime, 1);

        await escreverAnimeDB(listaAnimes);

        return res.status(200).json({ mensagem: `O anime ${listaAnimes.nome} foi excluído com sucesso` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: 'Erro interno'
        });
    }
};
module.exports = {
    excluirAnime
};