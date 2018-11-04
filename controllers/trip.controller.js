import { createTrip } from '../services/trip.service';
import Boom from 'boom';

/**
 * This function creates a new user trip.
 * It uses the createTrip function from trip.service
 * @param {*} req 
 * 
 * @returns {Promise}
 */
const createUserTrip = req => {
    return createTrip(req).then(trip => {
        return { message: 'Trip created successfully', trip}
    }).catch(err => {
        return Boom.badRequest('Algo anda mal ' + err);
    })
}

export {
    createUserTrip
}