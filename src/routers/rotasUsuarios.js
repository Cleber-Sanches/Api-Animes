const express = require('express');

const autenticacaoUsuario = require('../middlewares/autenticacaoUser');
const listarAnimes = require('../controllers/animes/listaDeAnimes');
const listarAnimesUser = require('../controllers/animes/listaAnimesUser');
const criarNovaConta = require('../controllers/app/criarConta');
const realizarLogin = require('../controllers/app/entrar');
const { adicionarAnimeListaUsuario } = require('../controllers/usuarios/addAnimeListaUser');
const { removerAnimeListaUsuario } = require('../controllers/usuarios/removerAnimeListaUser');
const mudarStatusAnime = require('../controllers/usuarios/mudarStatus');

const rotas = express();

rotas.post('/registrar', criarNovaConta)
rotas.post('/entrar', realizarLogin)

rotas.use(autenticacaoUsuario)
rotas.get("/animes/usuario/lista", listarAnimesUser)
rotas.post('/animes/usuario/adicionar/:idOuNome', adicionarAnimeListaUsuario);

rotas.delete('/animes/usuario/remover/:idOuNome', removerAnimeListaUsuario);

rotas.path("/animes/usuario/minhaLista/status", mudarStatusAnime);


module.exports = rotas;
