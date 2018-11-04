import Boom from 'boom';
import User from '../models/User';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Utility function to find a user.
 * The req payload shoul contains the email of the user in
 * order to do the search.
 * 
 * @param {Object} req 
 */
const getUser = req => {
    return User.findOne({ email: req.payload.email });
}

/**
 * This method creates a new user.
 * The request payload should contains the dollowing attributes:
 *   -name: The user name
 *   -lastname: The user lastname
 *   -email: The user email
 *   -password: The user plain password
 *   -driver: This in case that the user should be a driver
 * 
 * @param {Object} req 
 * 
 * @returns {Promise}
 */
const createUser = req => {
    const { name, lastname, email, password, driver } = req.payload;
    const user = new User();
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.driver = driver ? true : false;
    return user.save(user);
}

/**
 * This function verifies if the user exists in the database.
 * This utility let us have users with a unique email
 * 
 * @param {Object} req 
 * @param {*} h 
 * 
 * @returns {Promise}
 */
const verifyUniqueUser = req => {
    return getUser(req).then(user => {
        if (user) {
            return Boom.badRequest('The email is already registered');
        } else {
            return req.payload;
        }
    }).catch(err => {
        return err
    })
}

/**
 * This function creates a new token based on a user object.
 * The token will contain the user id, email and the scope.
 * 
 * @param {Object} user 
 * 
 * @returns {String} token
 */
const createToken = user => {
    const { secret, expiresIn } = config.authentication;
    let scopes;
    if (user.driver) {
        scopes = 'driver';
    }
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            scope: scopes
        },
        secret,
        {
            algorithm: 'HS256', expiresIn
        }
    );
    return token;
}

/**
 * This function verify if the credentials of the user are correct.
 * 
 * 
 * @param {Object} req 
 * 
 * @returns {Promise}
 */
const verifyCredentials = async (req) => {
    const password = req.payload.password;
    try {
        const user = await getUser(req);
        new Promise(resolve => {

        }, reject => {

        })
        return new Promise((resolve, reject) => {
            if (!user) {
                reject({ errorType: 'USER_NOT_EXIST', message: 'User does not exist' })
            } else {
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (isValid) {
                        resolve(createToken(user));
                    } else {
                        reject({ errorType: 'INVALID_PASSWORD', message: 'Invalid email or password' });
                    }
                });
            }
        });
    } catch (err) {
        console.log('Maybe send the stack trace to NewRelic')
    }
}

/**
 * Function to validate if the token is correct for a driver
 * 
 * @param {Object} req 
 * 
 * @returns {Promise}
 */
const verifyUserToken = async (req) => {
    const { secret } = config.authentication;
    try {
        return new Promise((resolve, reject) => {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret, (err, user) => {
                console.log(user);
                if (user.scope === 'driver') {
                    resolve({ valid: true });
                } else {
                    reject(Boom.badRequest('You need to be a driver'));
                }

            })
        });
    } catch (err) {
        console.log('Error verifying user token');
    }
}

export {
    createUser,
    verifyUniqueUser,
    verifyCredentials,
    verifyUserToken
}