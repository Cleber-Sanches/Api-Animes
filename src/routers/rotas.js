const express = require('express');

const listarAnimes = require('../controllers/animes/listaDeAnimes');
const { registrarAnime } = require('../controllers/animes/cadastrarAnime');
const { excluirAnime } = require('../controllers/animes/excluirAnime');

const buscarAnimes = require('../controllers/animes/buscarAnimes');

const rotas = express();

rotas.get('/animes', listarAnimes)
rotas.get('/animes/buscar/:idOuNome', buscarAnimes)
rotas.post('/animes/registrar', registrarAnime)
rotas.delete('/animes/:idOuNome', excluirAnime)


module.exports = rotas