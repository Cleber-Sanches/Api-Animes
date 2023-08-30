const fs = require('fs/promises');

const escreverAnimeUser = async (dados) => {
    const caminhoArquivo = './src/database/listaAnimesPorUsuarios.json';
    try {
        await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
        console.log('Dados atualizados e escritos no banco de dados.');
    } catch (erro) {
        console.error('Erro ao escrever no banco de dados:', erro);
    }
};


const escreverId = async (dados) => {
    const caminhoArquivo = './src/database/id.json';
    try {
        await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
        console.log('Dados atualizados e escritos no banco de dados.');
    } catch (erro) {
        console.error('Erro ao escrever no banco de dados:', erro);
    }
};


const escreverUsuario = async (dados) => {
    const caminhoArquivo = './src/database/usuarios.json';
    try {
        await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
        console.log('Dados atualizados e escritos no banco de dados.');
    } catch (erro) {
        console.error('Erro ao escrever no banco de dados:', erro);
    }
};


const escreverAnimeDB = async (dados) => {
    const caminhoArquivo = './src/database/animes.json';
    try {
        await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
        console.log('Dados atualizados e escritos no banco de dados.');
    } catch (erro) {
        console.error('Erro ao escrever no banco de dados:', erro);
    }
};

module.exports = {
    escreverAnimeUser,
    escreverAnimeDB,
    escreverId,
    escreverUsuario
}