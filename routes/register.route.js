import { register } from '../controllers/authentication.controller';
import UserValidator from '../validators/UserValidator';
import { verifyUniqueUser } from '../services/user.service';
const handleError = function (request, h, err) {

    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        return h.response({errorType: 'VALIDATION_ERROR', message: JSON.stringify(err.details)})
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
};

/**
 * Summary.
 * 
 * This endpoint let us register a new user.
 * Executes a Mongoose hook 'pre' in order to save the 
 * hash of the password. Also executes a pre validation
 * 'verifyUniqueUser' to only register unique emails.
 * 
 * @param {string} name. The user name
 * @param {string} lastname. The user lastname
 * @param {string} email. The user email
 * @param {string} password. The user defined password
 * 
 * @returns {JSON} Returns the JSON object with a successful message
 */
module.exports = {
    method: 'POST',
    path: '/api/register',
    handler: register,
    options: {
        pre: [
            { method: verifyUniqueUser }
        ],
        validate: {
            payload: UserValidator,
            failAction: handleError
        }
    }
}