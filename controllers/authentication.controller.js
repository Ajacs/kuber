import {
    createUser,
    verifyCredentials,
    verifyUserToken
} from '../services/user.service';
import Boom from 'boom';

/**
 * This function create a new user in the database.
 * It uses the createUser function from the user service.
 * 
 * @param {Object} req 
 * 
 * @return {JSON} 
 */
const register = req => {
    return createUser(req).then(user => {
        return {
            message: 'User created successfully', //@TODO: centralizar los mensajes
            user
        }
    }).catch(err => {
        return { message: err }
    });
}

/**
 * This function authenticate the user credentials with the database record
 * 
 * 
 * @param {Object} req 
 * 
 * @return {JSON} 
 */
const authenticate = req => {
    return verifyCredentials(req).then(token => {
        return { token: token}
    }).catch((obj) => {
        return Boom.notFound(obj.message)
    });
}

/**
 * This function verify if the provided token is correct
 * 
 * @param {*} req 
 * 
 * @return {Object} user
 */
const verifyToken = req => {
    return verifyUserToken(req).then(user => user);
}

export {
    register,
    authenticate,
    verifyToken
}