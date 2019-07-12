const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'], //Apenas poderá receber esses dois valores.
        default: 'created'
    },
    items: [{
        quantity: {
            type: number,
            required: true,
            default: 1
        },
        price: {
            type: number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

module.exports = mongoose.model('Order', schema);
