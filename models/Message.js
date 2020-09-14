const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
});

module.exports = model('Message', messageSchema);
