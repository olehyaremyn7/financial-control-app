const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
    account:{
        ref: 'Account',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    appointment: {
        type: String,
        default: 'Without appointment'
    },
    source: {
        type: String,
        default: 'Without source'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    note: {
        type: String,
        default: ''
    }
});

module.exports = model('Transaction', transactionSchema);
