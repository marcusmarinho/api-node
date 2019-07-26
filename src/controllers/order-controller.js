const mongoose = require('mongoose');
const guid = require('guid');

const Order = mongoose.model('Order');
const repository = require('../repositories/order-repository');

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

exports.post = async (req, res) => {
  try {
    await repository.create({
      customer: req.body.customer,
      number: guid.raw().substring(0, 6),
      items: req.body.items,
    });
    res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      error,
    });
  }
};
