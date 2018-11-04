import {
    createUser,
    verifyCredentials,
    verifyUserToken
} from '../services/user.service';
import Boom from 'boom';


const register = (req, h) => {
    return createUser(req).then(user => {
        return {
            message: 'User created successfully', //@TODO: centralizar los mensajes
            user
        }
    }).catch(err => {
        return { message: err }
    });
}


const authenticate = (req, h) => {
    return verifyCredentials(req).then(token => token).catch((obj) => {
        return Boom.notFound(obj.message)
    });
}

const verifyToken = (req, h) => {
    return verifyUserToken(req).then(user => user);
}

export {
    register,
    authenticate,
    verifyToken
}