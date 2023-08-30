
const { lerAnimesDB } = require('../../utils/leitura_e_escrita_de_arquivos/lerDB');

const listarAnimes = async (req, res) => {
    try {
        const listaDeAnimes = await lerAnimesDB();
        console.log(req.usuario)
        return res.status(200).json(listaDeAnimes);

    } catch (erro) {
        return res.status(500).json({ mensagem: "erro interno!" })
    }

}


module.exports = listarAnimes