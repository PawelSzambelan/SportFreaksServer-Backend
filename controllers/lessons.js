const Lesson = require('../models/lesson');
const User = require('../models/user');
const Customer = require('../models/customer');

module.exports = {

    index: async (req, res, next) => {
        // get all lessons
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    },

    //getting all lessons the exact day - needed for graphic
    getLessonsExactDay: async (req, res, next) => {
        const lessons = await Lesson.find({});
        const date = req.path.substr(1);
        const filteredLessonsByDate = lessons.filter(function (lessons) {
            return lessons.date == date;
        });
        res.status(200).json(filteredLessonsByDate);
    },

    addLesson: async (req, res, next) => {
        // create a new customer
        const newCustomer = req.body;

        delete newCustomer.customerQuantity;
        delete newCustomer.date;
        delete newCustomer.hour;
        delete newCustomer.instructor;


        //check if customer phone exist in customers data table
        // if exists then take existing one not just created one (code below creating lesson)
        // add that if phone number is already in data base then fill the form once again or show some message
        const allCustomers = await Customer.find({});
        const existngCustomer = allCustomers.filter(function (customer) {
            return customer.phone == req.value.body.phone;
        });

        // create a new lesson
        const lesson = new Lesson ();
        lesson.customerQuantity = req.value.body.customerQuantity;
        lesson.date = req.value.body.date;
        lesson.hour = req.value.body.hour;
        lesson.instructor = req.value.body.instructor;

        // save lesson with existing customer id or with new one
        // better to do sth that show some message that phone number is already in use
        if (existngCustomer.length == 0) {
            const customer = new Customer (newCustomer);
            lesson.customer = customer._id;
            await customer.save();
        } else {
            lesson.customer = existngCustomer[0]._id
        }
        await lesson.save();

        // find instructor
        const instructor = await User.findById(req.value.body.instructor);

        // add this new lesson to instructor
        instructor.lessons.push(lesson);
        await instructor.save();

        // done
        res.status(200).json(lesson);
    },









    newLesson: async (req, res, next) => {
        console.log('req.value', req.value);

        // find actual instructor
        const instructor = await User.findById(req.value.body.instructor);

        // create a new lesson
        const newLesson = req.body;
        delete newLesson.instructor;

        const lesson = new Lesson(newLesson);
        lesson.instructor = instructor;
        await lesson.save();

        // add this new lesson to instructor
        instructor.lessons.push(lesson);
        await instructor.save();

        // done
        res.status(200).json(lesson);
    },

    getLesson: async (req, res, next) => {
        const lesson = await Lesson.findById(req.value.params.lessonId);
        res.status(200).json(lesson);
    },

    replaceLesson: async (req, res, next) => {
        const {lessonId} = req.value.params;
        const newLesson = req.value.body;
        const result = await Lesson.findByIdAndUpdate(lessonId, newLesson);
        res.status(200).json({success: true});
    },

    updateLesson: async (req, res, next) => {
        const {lessonId} = req.value.params;
        const newLesson = req.value.body;
        const result = await Lesson.findByIdAndUpdate(lessonId, newLesson);
        res.status(200).json({success: true});
    },

    deleteLesson: async (req, res, next) => {
        const {lessonId} = req.value.params;

        //get lesson
        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({error: 'Lesson doesn\'t exist'});
        }
        const instructorId = lesson.instructor;

        //get instructor
        const instructor = await User.findById(instructorId);

        //remove an instructor
        await lesson.remove();

        //remove the lesson from instructor's lessons array
        instructor.lessons.pull(lesson);
        await instructor.save();

        res.status(200).json({success: true});
    },


};
