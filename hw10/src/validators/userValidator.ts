import Joi from 'joi';

import { commonValidator } from './commonValidator';

export const userValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('email not valid').trim(),
        password: Joi.string().required().min(8).message('password not valid!!!!')
            .trim(),
    }),

    email: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid').trim(),
    }),

    password: Joi.object({
        password: Joi.string().required().min(8).message('Password not valid')
            .trim(),
    }),
};
