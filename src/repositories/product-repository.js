const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        }, 'title price slug'); // Campos que serão mostrados
}

exports.getBySlug = (slug) => {
    return Product
        .findOne({ // Traz apenas um item e nao um array em si
            slug: slug,
            active: true,
        }, 'title descript price slug tags');
}

exports.getById = (id) => {
    return Product
        .findById(id);
}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true,
        }, 'title description price slug tags')
}

exports.create = (body) => {
    const product = new Product(body);
    return product.save();
}

exports.update = (id, body) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: body.title,
                description: body.description,
                price: body.price,
                slug: body.slug
            }
        });
}

exports.delete = (id) => {
    return Product
        .findOneAndRemove(id);
}