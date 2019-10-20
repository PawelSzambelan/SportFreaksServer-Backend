const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'customer'
    // },
    customerName: {
        type: String,
        // required: true
    },
    customerSurname: {
        type: String,
        // required: false,
    },
    phone: {
        type: Number,
        // required: true
    },
    isPaid: {
        type: Boolean,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    customerQuantity: {
        type: Number,
        // required: true
    },
    customerAge: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        // required:true
    },
    hour: {
        type: Number,
        // required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
        // required: true
    }
});

//table in Mongoose is a model
const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;
