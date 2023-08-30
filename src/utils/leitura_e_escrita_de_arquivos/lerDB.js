const fs = require("fs/promises");

const lerAnimesDB = async () => {
    try {
        const data = await fs.readFile("./src/database/animes.json");
        const animes = JSON.parse(data.toString());
        return animes;
    } catch (error) {
        throw new Error("Arquivo não encontrado");
    }
};


const lerAnimesUser = async (req, res) => {
    try {
        const animes = JSON.parse(
            await fs.readFile("./src/database/listaAnimesPorUsuarios.json")
        )
        return animes
    } catch (erro) {
        throw new Error("Arquivo não encontrado")
    }
};


const lerID = async () => {
    try {
        const data = await fs.readFile("./src/database/id.json");
        const animes = JSON.parse(data.toString());
        return animes;
    } catch (error) {
        throw new Error("Arquivo não encontrado");
    }
};

const lerUsuarios = async (req, res) => {
    try {
        const usuariosDB = JSON.parse(
            await fs.readFile("./src/database/usuarios.json")
        )
        return usuariosDB
    } catch (erro) {
        throw new Error("Arquivo não encontrado")
    }
}

module.exports = {
    lerAnimesDB,
    lerAnimesUser,
    lerID,
    lerUsuarios
};