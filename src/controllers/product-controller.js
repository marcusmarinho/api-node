const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');

// Rota principal: localhost:3000/products
// Traz todos os produtos
exports.get = (req, res) => {
  Product
    .find({
      active: true,
    }, 'title price slug') // Busca os campos que você informa
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => { res.status(400).send(e); });
};

// Traz todos os produtos filtrando pelo slug
exports.getBySlug = (req, res) => {
  Product
    .findOne({ // Traz apenas um item e nao um array em si
      slug: req.params.slug,
      active: true,
    }, 'title descript price slug tags')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  Product
    .findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res) => {
  Product
    .find({
      tags: req.params.tag,
      active: true,
    }, 'title description price slug tags')
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
  
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    })
    .catch((e) => {
      res.status(400).send({ message: 'Falha ao cadastrar produto', data: e });
    });
};

exports.put = (req, res) => {
  Product
    .findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        slug: req.body.slug,
      },
    })
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
  Product
    .findOneAndRemove(req.params.id)
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