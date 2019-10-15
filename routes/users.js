const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

//passport for secret route
const passport = require('passport');
const passportConf = require('../passport');


const passportSignIn = passport.authenticate('local',{session: false});
const passportJWT = passport.authenticate('jwt',{session: false});


const UsersController = require('../controllers/users');
const {validateParam, validateBody, schemas} = require('../helpers/routeHelpers.js');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], UsersController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)], UsersController.updateUser);
// .delete();

router.route('/:userId/lessons')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUserLessons)
    .post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userLessonSchema)], UsersController.newUserLesson);

router.route('/signup')
    .post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/secret')
    .get(passportJWT, UsersController.secret);

module.exports = router;
