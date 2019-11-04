const User = require('../models/user');
const Customer = require('../models/customer');
const Lesson = require('../models/lesson');
const Rule = require('../models/rule');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/index');
const bcrypt = require('bcrypt');

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

    // getUser: async (req, res, next) => {
    //     const {userId} = req.value.params;
    //     const user = await User.findById(userId);
    //     res.status(200).json(user);
    // },

    // getUserLessons: async (req, res, next) => {
    //     const {userId} = req.value.params;
    //     const user = await User.findById(userId).populate('lessons');
    //     console.log('user', user);
    //     res.status(200).json(user.lessons);
    // },

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


    // z tych niżej korzystam
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
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        res.status(200).json({newUser});
    },

    signIn: async (req, res, next) => {
        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('Invalid email.');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');

        const userRule = await Rule.findById(user.rule);
        console.log('userRule id', user.rule);
        console.log('user rule name', userRule.name);
        const userRuleName = userRule.name;
        const token = user._id;
        res.status(200).json({token, userRuleName});
    },

    updateUser: async (req, res, next) => {
        const {userId} = req.value.params;
        const newUser = req.value.body;
        // if user changed password then hash it again, but if not then do not hash it
        if (!(newUser.password.length >= 40)) {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
        }
        await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    deleteUser: async (req, res, next) => {
        const {userId} = req.value.params;
        const user = await User.findById(userId);
        for( lessonId of user.lessons) {
            await Lesson.findByIdAndDelete(lessonId);
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({success: true});
    },

    getLoggedInUser: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);

        const userRule = await Rule.findById(user.rule);
        const userRuleName = userRule.name;

        res.status(200).json({user, userRuleName});
    },

    getUserLessons: async (req, res, next) => {
        const id = req.header('auth-token');
        const date = req.path.substring(13);
        const userLessons = await User.findById(id).populate('lessons');

        const filteredLessonsByDate = userLessons.lessons.filter(function (lessons) {
            return lessons.date == date;
        });
        res.status(200).json(filteredLessonsByDate);
    },

    getCustomers: async (req, res, next) => {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    },

    getInstructors: async (req, res, next) => {
        const allUsers = await User.find({});

        // const rules = await Rule.find({});
        // const instructorRule = rules.find(function (instructor) {
        //     return instructor.name === 'instructor';
        // });

        const instructors = allUsers.filter(function (user) {
            // return user.rule == instructorRule.id;
            return user.rule == '5da733b3c3a29f3440edb8b9';
        });
        res.status(200).json(instructors);
    },

    getReceptionists: async (req, res, next) => {
        const allUsers = await User.find({});
        const rules = await Rule.find({});
        const receptionistRule = rules.find(function (receptionist) {
            return receptionist.name === 'Biuro';
        });
        const receptionists = allUsers.filter(function (user) {
            return user.rule == receptionistRule.id;
            // return user.rule == '5da73348c3a29f3440edb8b7';
        });
        res.status(200).json(receptionists);
    },

    getAdmins: async (req, res, next) => {
        const allUsers = await User.find({});
        const rules = await Rule.find({});
        const adminRule = rules.find(function (admin) {
            return admin.name === 'Administrator';
        });
        const admins = allUsers.filter(function (user) {
            return user.rule == adminRule.id;
            // return user.rule == '5da73338c3a29f3440edb8b6';
        });
        res.status(200).json(admins);
    },

    getRules: async (req, res, next) => {
        const rules = await Rule.find({});
        res.status(200).json(rules);
    },

};
