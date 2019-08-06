const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rulesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

//table in Mongoose is a model
const Rules = mongoose.model('rules', rulesSchema);

module.exports = Rules;