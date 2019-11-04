const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    customerQuantity: {
        type: Number,
    },
    date: {
        type: String,
    },
    hour: {
        type: String,
   },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

//table in Mongoose is a model
const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;
