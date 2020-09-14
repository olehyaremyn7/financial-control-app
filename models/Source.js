const { Schema, model } = require('mongoose');

const sourceSchema = new Schema({
    value: {
        type: String
    },
    viewValue: {
        type: String
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
});

module.exports = model('Source', sourceSchema);
