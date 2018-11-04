import { authenticate } from '../controllers/authentication.controller';
import LoginJoiValidator from '../services/validators/LoginJoiValidator';

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
 * Authenticate the user and if the credentials are valid 
 * returns a JWT token that contains basic informacion of
 * the user (id, email). This route doesn't need to be
 * authenticated in order to make the request.
 * 
 * @param {String} email. The email of the user to authenticate
 * @param {String} password. The password of the user to authenticate
 * 
 * @return {String} JWT token with the user information.
 */
module.exports = {
    method: 'POST',
    path: '/api/authenticate',
    handler: authenticate,
    options: {
        validate: {
            payload: LoginJoiValidator,
            failAction: handleError
        }
    }
}