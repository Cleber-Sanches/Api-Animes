const { buscarAnimeEValidar } = require("../../services/sistemaDeBusca.service");

const buscarAnimes = async (req, res) => {
    const { idOuNome } = req.params;

    if (!idOuNome) {
        return
    }
    try {
        const animesEncontrados = await buscarAnimeEValidar(idOuNome);

        if (!animesEncontrados) {
            return res.status(404).json({ message: "Nenhum anime encontrado" });
        }

        return res.status(200).json(animesEncontrados);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro ao buscar o anime" });
    }
};

module.exports = buscarAnimes