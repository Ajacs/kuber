import Joi from 'joi';

/**
 * This makes the validation for user.
 * The request.payload should contains the following fields:
 * 
 * @param {string} name: The user name
 * @param {string} lastname: The user lastname
 * @param {string} email: The user email in a valid format
 * @param {string} password: The plain user password
 * @param {string} driver: If a user is a driver, this is optional
 */
const UserValidator = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    driver: Joi.boolean()
});

export default UserValidator;