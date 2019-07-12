const express = require('express'); // Express - modulo do Node para criar um MVC
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();

// Conecta ao banco
mongoose.connect('mongodb+srv://melissa:usermel2019@cluster0-inujy.mongodb.net/ndstr?retryWrites=true&w=majority', { useNewUrlParser: true });

// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);

module.exports = app;

/* Status -
200 - Ok
201 - Created,
400 - BadRequest,
401 - Não autenticado,
403 - Acesso Negado,
500 - Internal Server Error */

// Toda requisição é composta de um HEADER, BODY e Autorização
