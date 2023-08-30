

const mudarStatusAnime = (req, res) => {
    const { status } = req.body;

    const statusDisponiveis = {
        assistindo: "Assistindo",
        concluido: "Concluído",
        planejado: "Planejado",
        pausado: "Pausado",
        abandonado: "Abandonado",
        aguardando_Lancamento: "Aguardando Lançamento",
        maratona: "Maratona",
        reasistindo: "Reasistindo",
        acompanhando_Atualmente: "Acompanhando Atualmente"
    }

    if (!status) {
        return res.status(400).json({ message: "você tem que indicar qual status deseja definir!", statusDisponiveis })
    }
}

module.exports = mudarStatusAnime