const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerName: {
        type: String,
    },
    customerSurname: {
        type: String,
    },
    phone: {
        type: Number,
    },
    customerAge: {
        type: String,
    },
});

//table in Mongoose is a model
const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
