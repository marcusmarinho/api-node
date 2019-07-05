const express = require('express'); // Express - modulo do Node para criar um MVC
// Model e outros recursos
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
/* Status -
200 - Ok,
201 - Created,
400 - BadRequest,
401 - Não autenticado,
403 - Acesso Negado,
500 - Internal Server Error */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Toda requisição é composta de um HEADER, BODY e Autorização
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.1',
  });
});

const create = router.post('/', (req, res, next) => {
  res.status(201).send(req.body); // Pega o corpo da requisição
});

const put = router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(201).send({
    id,
    item: req.body,
  }); // Pega o corpo da requisição
});
app.use('/', route);
app.use('/products', create);

module.exports = app;
