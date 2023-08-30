const { escreverId } = require("../utils/leitura_e_escrita_de_arquivos/escreverDB");
const { lerID } = require("../utils/leitura_e_escrita_de_arquivos/lerDB");

let ultimoID = 0;

const inicializarIDs = async () => {
    const dadosID = await lerID()
    ultimoID = dadosID[0].ultimoID;
};

const obterProximoID = async () => {
    ultimoID++;
    await atualizarUltimoID();
    return ultimoID;
};

const atualizarUltimoID = async () => {
    const dadosID = await lerID();
    dadosID[0].ultimoID = ultimoID;
    await escreverId(dadosID);
};

module.exports = {
    obterProximoID,
    inicializarIDs
};