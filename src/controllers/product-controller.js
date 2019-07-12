const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// Rota principal: localhost:3000/products
// Traz todos os produtos
exports.get = async (req, res) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

// Traz todos os produtos filtrando pelo slug
exports.getBySlug = async (req, res) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

exports.getByTag = async (req, res) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

exports.post = async (req, res) => {
  // Persistir um produto com Mongoose
  const contract = new ValidatorContract();

  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

exports.put = async (req, res) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto atualizado com sucesso!',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
      message: 'Produto removido com sucesso!',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};
