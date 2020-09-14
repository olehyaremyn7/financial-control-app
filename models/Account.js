const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    expenses: {
        type: Number,
        default: 0
    },
    incomes: {
        type: Number,
        default: 0
    },
    periodBalance: {
        type: Number,
        default: 0
    }
});

module.exports = model('Account', accountSchema);
