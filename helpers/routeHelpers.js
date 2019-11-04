const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({param: req['params'][name]}, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {

        userSchema: Joi.object().keys({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required(),
            phone: Joi.number().required(),
            rule: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        userOptionalSchema: Joi.object().keys({
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            email: Joi.string().min(5).max(255).optional().email(),
            password: Joi.string().min(5).max(1024).optional(),
            phone: Joi.number().optional(),
            rule: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        userLessonSchema: Joi.object().keys({
            customerName: Joi.string().required(),
            customerSurname: Joi.string().optional(),
            phone: Joi.number().required(),
            isPaid: Joi.boolean().required(),
            price: Joi.number().required(),
            customerQuantity: Joi.number().required(),
            customerAge: Joi.string().required(),
            date: Joi.string().required(),
            hour: Joi.number().required()
        }),

        lessonSchema: Joi.object().keys({
            customerName: Joi.string().required(),
            customerSurname: Joi.string().optional(),
            phone: Joi.number().required(),
            customerAge: Joi.string().required(),
            customerQuantity: Joi.number().required(),
            date: Joi.string().required(),
            hour: Joi.string().required(),
            instructor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        putLessonSchema: Joi.object().keys({
            customerName: Joi.string().required(),
            customerSurname: Joi.string().optional(),
            phone: Joi.number().required(),
            isPaid: Joi.boolean().required(),
            price: Joi.number().required(),
            customerQuantity: Joi.number().required(),
            customerAge: Joi.string().required(),
            date: Joi.date().required(),
            hour: Joi.number().required(),
            instructor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        patchLessonSchema: Joi.object().keys({
            customerName: Joi.string(),
            customerSurname: Joi.string().optional(),
            phone: Joi.number(),
            isPaid: Joi.boolean(),
            price: Joi.number(),
            customerQuantity: Joi.number(),
            customerAge: Joi.string(),
            date: Joi.date(),
            hour: Joi.number(),
            instructor: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),

        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),

    },

};
