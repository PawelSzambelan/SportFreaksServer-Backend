const express = require('express');
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');
const {validateParam, validateBody, schemas} = require('../helpers/routeHelpers.js');

router.route('/')
    .get(UsersController.index);
    // .post(validateBody(schemas.userSchema), UsersController.newUser);

// router.route('/:userId')
//     .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
//     .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], UsersController.replaceUser)
//     .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)], UsersController.updateUser);
// .delete();



router.route('/:userId/lessons')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserLessons)
    .post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userLessonSchema)], UsersController.newUserLesson);



//z tych niżej korzystam

router.route('/signup')
    .post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), UsersController.signIn);

router.route('/updateUser/:userId')
    .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)], UsersController.updateUser);

//to mi zwracało wszystkie lekcje danego instruktora a niżej chciałem zrobić, żeby z danego dnia ;)
// router.route('/userLessons/')
//     .get(UsersController.getUserLessons);

router.route('/userLessons/:date')
    .get(UsersController.getUserLessons);

router.route('/instructors')
    .get(UsersController.getInstructors);

router.route('/receptionists')
    .get(UsersController.getReceptionists);

router.route('/admins')
    .get(UsersController.getAdmins);

router.route('/rules')
    .get(UsersController.getRules);

router.route('/user')
    .get(UsersController.getLoggedInUser);

module.exports = router;
