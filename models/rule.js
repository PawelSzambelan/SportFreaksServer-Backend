const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

//table in Mongoose is a model
const Rule = mongoose.model('rule', ruleSchema);

module.exports = Rule;
