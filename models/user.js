const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        email: {
            type: String,
           unique: true,
            lowercase: true
        },
        password: {
            type: String,
        },
        phone: {
            type: Number,
        },
        rule: {
            type: Schema.Types.ObjectId,
            ref: 'rule',
        },
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: 'lesson'
        }],
    })
;

//table in Mongoose is
const User = mongoose.model('user', userSchema);
module.exports = User;

