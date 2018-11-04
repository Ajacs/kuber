import Joi from 'joi';

/**
 * This makes the validation for a login payload.
 * The request.payload should contains the fields:
 * 
 * @param {string} email: The user registered email
 * @param {string} password: The user registered password
 */
const LoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default LoginValidator;