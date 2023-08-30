# API de Animes 🎬

Bem-vindo à API de Animes, um projeto desenvolvido para facilitar o gerenciamento e a exploração de seus animes favoritas.

## 📜 A História por Trás da API de Animes

A história por trás da API de Animes começa com uma situação. Eu estava ansioso para começar a assistir a um novo anime, mas me deparei com uma pergunta: quanto tempo eu precisaria para assistir ao anime completo? Surpreendentemente, não encontrei uma ferramenta que fornecesse essa informação de maneira simples e direta.

Essa ausência de uma solução imediata despertou minha curiosidade e, ao mesmo tempo, me inspirou. Decidi transformar essa necessidade pessoal em um projeto prático. A ideia inicial era criar uma calculadora de tempo de exibição que pudesse oferecer estimativas realistas com base na duração dos episódios e no número total deles. No entanto, por que parar por aí?

Ao explorar mais profundamente, percebi outra oportunidade a ser explorada: a falta de uma plataforma centralizada para gerenciar meus próprios animes. A busca por uma solução eficaz para acompanhar o que já assisti, o que estava assistindo e o que estava na fila de espera era uma necessidade compartilhada por muitos.

E assim, a API de Animes ganhou vida. Originou-se de uma necessidade pessoal e evoluiu para uma ferramenta que não apenas calcula o tempo de exibição, mas também oferece um espaço organizado para gerenciar e explorar uma variedade diversificada de animes. A API de Animes é o resultado da paixão por animes e do desejo de encontrar soluções práticas, criando uma experiência enriquecedora para todos os fãs desse mundo fascinante.

---

### Funcionalidades Ativas

- [ ] Calcular o tempo estimado para assistir a um anime completo.

  - [A funcionalidade de cálculo de tempo está sendo desenvolvida e estará disponível em breve.]

- [x] Gerenciar uma lista personalizada de animes assistidos, em andamento e planejados.

  - [x] Listar animes na lista do usuário.
  - [x] Adicionar um anime à lista do usuário.
  - [x] Remover um anime da lista do usuário.
  - [ ] Indicar o episódio atual assistido pelo usuário.

- [x] Pesquisar animes por nome ou ID.

  - [x] Buscar detalhes de um anime por ID ou nome.

- [x] Recursos administrativos para adicionar, atualizar e remover animes do banco de dados.
  - [x] Registrar um novo anime.
  - [x] Excluir um anime do banco de dados.

### Funcionalidades a Serem Implementadas

- [ ] Sistema de avaliação para cada anime.

  - [ ] Adicionar a funcionalidade de avaliação para cada anime.
  - [ ] Permitir que os usuários avaliem os animes com notas.

- [ ] Sistema de gerenciamento de status dos animes na lista do usuário.
  - [ ] Permitir que os usuários marquem animes como "Assistindo", "Completo" e "Planejado" etc...
  - [ ] Implementar atualização de status para cada anime na lista do usuário.

---

## 🛠️ Como Usar

1.  **Clone o Repositório:** Comece clonando este repositório em seu ambiente de desenvolvimento.
2.  **Instale as Dependências:** Use o comando `npm install` para instalar as dependências necessárias.
3.  **Inicie a Aplicação:** Execute a aplicação com o comando `npm run dev`.
4.  **Explore as Rotas:** Utilize um cliente API, como o [Insomnia](https://insomnia.rest/), para explorar e testar as rotas da API.
5.  **Exemplo de Uso:** Abaixo, você encontrará um link para baixar um arquivo JSON com as rotas da API configuradas no Insomnia. Importe este arquivo no Insomnia para começar a interagir com a API imediatamente.

    [![Arquivo com as rotas](https://img.shields.io/badge/Arquivo%20com%20as%20rotas-4000BF?logo=insomnia&logoColor=white)](/C:/Users/clebe/AppData/Local/Programs/Joplin/resources/app.asar/seu_link_aqui_para_o_arquivo.json "seu_link_aqui_para_o_arquivo.json")

---

## 🚀 Rotas da API

Aqui estão as principais rotas da API de Animes e suas descrições:

<details><summary><b>POST /registrar</b>- Criar Nova Conta</summary>

Cria uma nova conta de usuário.

**Corpo da requisição:**

```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

**Exemplo de resposta (201 Created):**

```json
{
  "mensagem": "Conta criada com sucesso!"
}
```

</details><details><summary><b>POST /entrar</b>- Realizar Login</summary>

Realiza o login do usuário.

**Corpo da requisição:**

```json
{
  "email": "usuario@example.com",
  "senha": "senha123"
}
```

Exemplo de resposta (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmNTVkNzU1LWRjMjUtNGUzYy1iOGY2LWI4MDdiZDAwNDUwZiIsIm5vbWUiOiJjbGViZXIiLCJlbWFpbCI6ImFkQGdtYWlsLmNvbSIsImlhdCI6MTY5MzM0MzU2NiwiZXhwIjoxNjkzMzcyMzY2fQ.E8SSyUg0VW-cDy2-MxcR_4RlUux5lWZdYcTCbSyPPhs",
  "usuario": {
    "id": "7f55d755-dc25-4e3c-b8f6-b807bd00450f",
    "nome": "nome de usuário",
    "email": "usuario@example.com"
  }
}
```

</details><details><summary><b>GET /animes</b>- Listar Animes</summary> 
   Retorna a lista de todos os animes cadastrados.

**Exemplo de resposta (200 OK):**

```json
[
  {
    "animeID": 1,
    "data": {
      "nome": "One Piece",
      "episodios": 1073,
      "status": "Em andamento",
      "dia_horario_transmissao": "Sábados, 23:00",
      "duracaoPorEp": 24,
      "generos": ["Ação", "Aventura", "Fantasia"]
    }
  },
  {
    "animeID": 2,
    "data": {
      "nome": "Boruto: Naruto Next Generations",
      "episodios": 293,
      "status": "Em andamento",
      "dia_horario_transmissao": "Não definido",
      "duracaoPorEp": 24,
      "generos": ["Ação", "Aventura", "Fantasia", "Shounen"]
    }
  }
]
```

</details><details><summary><b>
   GET /animes/buscar/:idOuNome</b>- Buscar Animes</summary>

Busca um anime pelo ID ou nome.

Exemplo de requisição:

`GET /animes/buscar/1`

Exemplo de resposta (200 OK):

```json
{
  "animeID": 1,
  "data": {
    "nome": "One Piece",
    "episodios": 1073,
    "status": "Em andamento",
    "dia_horario_transmissao": "Sábados, 23:00",
    "duracaoPorEp": 24,
    "generos": ["Ação", "Aventura", "Fantasia"]
  }
}
```

</details>

<details><summary>
   <b>POST /animes/registrar</b> - Registra um novo anime</summary>

Registra um novo anime no banco de dados.

**Corpo da requisição:**

```json
{
  "nome": "Boruto: Naruto Next Generations",
  "episodios": 293,
  "status": "Em andamento",
  "dia_horario_transmissao": "Não definido",
  "duracaoPorEp": 24,
  "generos": ["Ação", "Aventura", "Fantasia", "Shounen"]
}
```

O corpo da requisição deve ser um objeto JSON contendo os seguintes campos:

- **nome**: O nome do anime a ser registrado. `(obrigatório)`
- **episodios**: O número total de episódios do anime. `(obrigatório)`
- **status**: O status atual do anime (ex: "Em andamento", "Concluído", etc.). `(obrigatório)`
- **dia_horario_transmissao**: O dia e horário de transmissão do anime, se aplicável. `(opcional)`
- **duracaoPorEp**: A duração média de cada episódio em minutos. `(obrigatório)`
- **generos**: Uma lista de gêneros aos quais o anime pertence. `(obrigatório)`

</details>
<details>
<summary><b>DELETE /animes/:idOuNome</b> - Excluir Anime</summary>

Exclui um anime do banco de dados com base no ID ou nome fornecido.

**Parâmetros da URL:**

- **idOuNome**: ID numérico ou nome do anime a ser excluído.

Exemplo de requisição:
`DELETE /animes/1`

ou

`DELETE /animes/NomeDoAnime`

Exemplo de resposta (200 OK):

```json
{
  "mensagem": "Anime excluído com sucesso!"
}
```

</details>

<details>
<summary><b>POST /animes/usuario/adicionar/:idOuNome</b> - Adicionar Anime à Lista do Usuário</summary>

Adiciona um anime à lista pessoal do usuário com base no ID ou nome fornecido.

**Parâmetros da URL:**

- **idOuNome**: ID numérico ou nome do anime a ser adicionado à lista do usuário.

Exemplo de requisição:

`POST /animes/usuario/adicionar/1`

ou

`POST /animes/usuario/adicionar/NomeDoAnime`

**Observações:**

- Se a busca pelo nome do anime retornar mais de um resultado, o sistema não permitirá a adição. Nesse caso, é recomendado verificar o ID único do anime e usá-lo para a adição.
- Ao adicionar um anime, a mensagem de resposta incluirá uma lista com os animes correspondentes à busca pelo nome, caso tenha sido feita.

Exemplo de resposta (201 Created):

```json
{
  "mensagem": "Anime adicionado à sua lista com sucesso!"
}
```

</details>

<details>
<summary><b>DELETE /animes/usuario/remover/:idOuNome</b> - Remover Anime da Lista do Usuário</summary>

Esta rota permite remover um anime da lista pessoal do usuário. Você pode usar o ID numérico ou o nome do anime para remover da lista.

**Parâmetros:**

- **idOuNome**: ID numérico ou nome do anime a ser removido.

**Autenticação:**

- Certifique-se de estar autenticado para usar esta rota. Inclua o token de autenticação no cabeçalho da requisição no formato Bearer.

**Observações:**

- Se a busca pelo nome do anime retornar vários resultados, recomendamos usar o ID único do anime para remover.
- A mensagem de resposta incluirá uma lista de animes correspondentes ao nome buscado, se aplicável.

Exemplo de requisição:

`DELETE /animes/usuario/remover/1`

ou

`DELETE /animes/usuario/remover/NomeDoAnime`

Exemplo de resposta (200 OK):

```json
{
  "mensagem": "Anime removido da sua lista com sucesso!"
}
```

</details>

<details>
<summary><b>GET /animes/usuario/lista</b> - Listar Animes do Usuário</summary>

Esta rota permite listar os animes presentes na lista pessoal do usuário.

**Autenticação:**

- Certifique-se de estar autenticado para usar esta rota. Inclua o token de autenticação no cabeçalho da requisição no formato Bearer.

Exemplo de requisição:

`GET /animes/usuario/lista`

Exemplo de resposta (200 OK):

```json
[
  {
    "id": 1,
    "nome": "Boruto: Naruto Next Generations",
    "episodios": 293,
    "status": "Em andamento",
    "dia_horario_transmissao": "Não definido",
    "duracaoPorEp": 24,
    "generos": ["Ação", "Aventura", "Fantasia", "Shounen"]
  },
  {
    "id": 2,
    "nome": "Attack on Titan",
    "episodios": 75,
    "status": "Concluído",
    "dia_horario_transmissao": "Domingos, 10:00",
    "duracaoPorEp": 23,
    "generos": ["Ação", "Drama", "Fantasia", "Mistério", "Shounen"]
  }
  // ... outros animes do usuário
]
```

</details>

---

## 📬 Contato

Se tiver alguma dúvida, sugestão ou desejar entrar em contato, fique à vontade para me enviar uma mensagem direta no Discord:

[![Clique aqui](https://img.shields.io/badge/Clique%20aqui-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/HxtrEKNsfy)

Estou à disposição para ajudar! Se você tiver qualquer pergunta ou quiser compartilhar uma sugestão, sinta-se à vontade para entrar em contato por mensagem direta no Discord. Estou ansioso para ouvir de você!
