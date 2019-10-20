const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            // required: true
        },
        rule: {
            type: Schema.Types.ObjectId,
            ref: 'rule',
            // required: true
        },
        // rule: {
        //     type: String,
        // },
        lessons: [{
            type: Schema.Types.ObjectId,
            ref: 'lesson'
        }],
// created_at: Date
    })
;

// userSchema.pre('save', function(next) {
//     if (!this.created_at)
//         this.created_at = new Date;

//     next();
// });



// userSchema.pre('save', async function (next) {
//     try {
//         //generale a salt
//         const salt = await bcrypt.genSalt(10);
//         // generate a password hash ( salt + hash)
//         const passwordHash = await bcrypt.hash(this.password, salt);
//         // Re-assign hashed version over oryginal, plain text password
//         this.password = passwordHash;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });
//
// userSchema.methods.isValidPassword = async function (newPassword) {
//     try {
//         return await bcrypt.compare(newPassword, this.password);
//     } catch (error) {
//         throw new Error(error);
//     }
// };

//table in Mongoose is
const User = mongoose.model('user', userSchema);
module.exports = User;

