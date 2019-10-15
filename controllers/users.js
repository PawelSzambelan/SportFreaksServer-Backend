const User = require('../models/user');
const Lesson = require('../models/lesson');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index');

signToken = user => {
    return JWT.sign({
        iss: 'SportFreaks',
        sub: user.id,
        iat: new Date().getTime(), // current time
        // exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // expiration token for 1 hour
    }, JWT_SECRET);
};

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const {userId} = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        // req.body may contain any number of fields
        const {userId} = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    getUserLessons: async (req, res, next) => {
        const {userId} = req.value.params;
        const user = await User.findById(userId).populate('lessons');
        console.log('user', user);
        res.status(200).json(user.lessons);
    },

    newUserLesson: async (req, res, next) => {
        const {userId} = req.value.params;
        // create a new lesson
        const newLesson = new Lesson(req.value.body);
        // get user
        const user = await User.findById(userId);
        // assign user to a lesson
        newLesson.instructor = user;
        // save the lesson
        await newLesson.save();
        // add lesson to the user's lessons array 'lessons'
        user.lessons.push(newLesson);
        // save the user
        await user.save();
        res.status(201).json(newLesson);
    },

    signUp: async (req, res, next) => {
        const {name, surname, email, password, phone, rule} = req.value.body;
        console.log(req.value.body);

        //Check if there is a user with the same email
        const foundUser = await User.findOne({email});
        if (foundUser) {
            return res.status(403).json({error: 'Email is already in use'});
        }

        // Create a new user
        const newUser = new User({name, surname, email, password, phone, rule});
        // const salt = await bcrypt.genSalt(10);
        // newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        //create a token
        const token = signToken(newUser);

        // res.status(200).json({newUser});
        res.status(200).json({token});
    },

    signIn: async (req, res, next) => {
        console.log('I managed to get /signIn route');
        // generate token
        const token = signToken(req.user);
        const userRule = req.user.rule;
        console.log(req.user.rule);
        // res.status(200).json(req.user.rule + {token});
        res.status(200).json({token, userRule});
    },

    secret: async (req, res, next) => {
        console.log('I managed to get /secret route');
        res.json({secret: "resource"});
    },


};
