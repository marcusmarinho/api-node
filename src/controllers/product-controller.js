'use strict';

exports.post = (req, res, next) => {
    res.status(201).send(req.body)
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