const router= require('express-promise-router')();


const LessonsController = require('../controllers/lessons');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers.js');

router.route('/')
    .get(LessonsController.index)
    .post(validateBody(schemas.lessonSchema),LessonsController.newLesson);

router.route('/:lessonId')
    .get(validateParam(schemas.idSchema, 'lessonId'), LessonsController.getLesson)
    .put([validateParam(schemas.idSchema, 'lessonId'), validateBody(schemas.putLessonSchema)], LessonsController.replaceLesson)
    .patch([validateParam(schemas.idSchema, 'lessonId'), validateBody(schemas.patchLessonSchema)], LessonsController.updateLesson)
    .delete(validateParam(schemas.idSchema, 'lessonId'), LessonsController.deleteLesson);

module.exports = router;
