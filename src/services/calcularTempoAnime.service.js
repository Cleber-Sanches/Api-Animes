
const lerDB = require("../../utils/Ler_arquivos/lerAnimes");
const { addWeeks, format } = require("date-fns");
const { ptBR } = require('date-fns/locale');

const calcularTempo = async (req, res) => {
    const { nomeAnime } = req.params;
    const { episodiosPorSemana } = req.body;

    if (!episodiosPorSemana) {
        return res.status(400).json({ mensagem: 'É necessário informar o número de episódios por semana' });
    }
    if (!nomeAnime) {
        return res.status(400).json({ mensagem: 'É necessário informar o nome do anime' });
    }

    try {
        const lista = await lerDB();
        const anime = lista.find(anime => anime.nome === nomeAnime);

        if (!anime) {
            return res.status(404).json({ error: 'O anime não foi encontrado' });
        }

        const { nome, totalEpisodios, episodioAtual, duracaoMediaEpisodio } = anime;

        const tempoTotalMinutos = (totalEpisodios - episodioAtual) * duracaoMediaEpisodio;
        const tempoTotalHoras = Math.floor(tempoTotalMinutos / 60);
        const tempoTotalMinutosRestantes = tempoTotalMinutos % 60;

        const duracaoSemanas = Math.ceil((totalEpisodios - episodioAtual) / episodiosPorSemana);

        const dataTermino = addWeeks(new Date(), duracaoSemanas);
        const dataTerminoFormatada = format(dataTermino, 'iii, dd MMM yyyy', { locale: ptBR });

        return res.status(200).json({
            mensagem:
                `Tempo total de duração: ${tempoTotalHoras} horas e ${tempoTotalMinutosRestantes} minutos. ` +

                `Você vai precisar de aproximadamente ${duracaoSemanas} semanas para assistir  o anime ${nome}. ` +

                `Se começar hoje, você terminará ${dataTerminoFormatada}.`
        });

    } catch (error) {
        return res.status(500).json({ error: 'Ocorreu um erro' });
    }
}

module.exports = calcularTempo;