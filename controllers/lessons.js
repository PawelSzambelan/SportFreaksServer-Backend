const Lesson = require('../models/lesson');
const User = require('../models/user');

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
        console.log('date from req.path: ', date);

        const filteredLessonsByDate = lessons.filter(function (lessons){
            // console.log('date from req.path: ', date);
            // console.log('date from req.path: ', lessons.date);
            // console.log(date == lessons.date);
            return lessons.date == date;
        });
        // console.log('filteredLessonsByDate: ', filteredLessonsByDate);
        // res.status(200).json(userLessons.lessons);
        res.status(200).json(filteredLessonsByDate);

        // res.status(200).json(lessons);
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
