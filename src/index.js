const express = require('express');
const rotasAnime = require('./routers/rotas');
const rotasUsuarios = require('./routers/rotasUsuarios');



const app = express();

app.use(express.json());
app.use(rotasAnime);
app.use(rotasUsuarios)

const port = 3000;

app.listen(port);