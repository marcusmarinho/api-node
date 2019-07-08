'use strict';

const express = require('express'); // Express - modulo do Node para criar um MVC
const bodyParser = require('body-parser');
const app = express();
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;

/* Status -
200 - Ok
201 - Created,
400 - BadRequest,
401 - Não autenticado,
403 - Acesso Negado,
500 - Internal Server Error */

// Toda requisição é composta de um HEADER, BODY e Autorização