const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.get = async () => {
  const res = await Product
    .find({
      active: true,
    }, 'title price slug'); // Campos que serão mostrados
  return res;
};

exports.getBySlug = async (slug) => {
  const res = await Product
    .findOne({ // Traz apenas um item e nao um array em si
      slug,
      active: true,
    }, 'title descript price slug tags');
  return res;
};

exports.getById = async (id) => {
  const res = await Product
    .findById(id);
  return res;
};

exports.getByTag = async (tag) => {
  const data = await Product
    .find({
      tags: tag,
      active: true,
    }, 'title description price slug tags');
  return data;
};

exports.create = async (body) => {
  const product = new Product(body);
  await product.save();
};

exports.update = async (id, body) => {
  await Product
    .findByIdAndUpdate(id, {
      $set: {
        title: body.title,
        description: body.description,
        price: body.price,
        slug: body.slug,
      },
    });
};

exports.delete = async (id) => {
  await Product
    .findByIdAndRemove(id);
};
