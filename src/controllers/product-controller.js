const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// Rota principal: localhost:3000/products
// Traz todos os produtos
exports.get = (req, res) => {
  repository
    .get()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => { res.status(400).send(e); });
};

// Traz todos os produtos filtrando pelo slug
exports.getBySlug = (req, res) => {
  repository.getBySlug(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  repository
    .getById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res) => {
  repository
    .getByTag(req.params.tag)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res) => {
  // Persistir um produto com Mongoose
  let contract = new ValidatorContract();

  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

  //Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository
    .create(req.body)
    .then(() => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    })
    .catch((e) => {
      res.status(400).send({ message: 'Falha ao cadastrar produto', data: e });
    });
};

exports.put = (req, res) => {
  repository
    .update(req.params.id, req.body)
    .then(() => {
      res.status(200).send({
        message: 'Produto atualizado com sucesso!',
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Falha ao atualizar o produto',
        data: e,
      });
    });
};

exports.delete = (req, res) => {
  repository
    .delete(req.params.id)
    .then(() => {
      res.status(200).send({
        message: 'Produto removido com sucesso!',
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: 'Falha ao remover o produto',
        data: e,
      });
    });
};