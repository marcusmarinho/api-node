'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//Rota principal: localhost:3000/products
//Traz todos os produtos
exports.get = (req, res, next) => {
    Product
        .find({
            active: true
        }, 'title price slug') //Busca os campos que você informa
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => { res.status(400).send(e) });
}

//Rota principal: localhost:3000/products/:slug
//Traz todos os produtos filtrando pelo slug
exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ //Traz apenas um item e nao um array em si
            slug: req.params.slug,
            active: true
        }, 'title descript price slug tags') //Busca os campos que você informa
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e)
        });
}

//Traz todos os produtos filtrando pelo id
exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e)
        });
}

exports.post = (req, res, next) => {
    //Persistir um produto com Mongoose
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar produto', data: e });
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id; //Recuperar parametro da url
    res.status(201).send({
        id: id,
        item: req.body,
    }); // Pega o corpo da requisição
};

exports.delete = (req, res, next) => {
    res.status(201).send(req.body)
};