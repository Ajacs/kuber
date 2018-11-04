import { register_location } from '../controllers/trip.position.tracking.controller';
import TripPositionTrackingValidator from '../services/validators/TripPositionTrackingValidator';

const handleError = function (request, h, err) {

    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(err.details)}`)
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
};

/**
 * Summary.
 * 
 * This endpoint manage the creation of a new driver position.
 * This endpoint need a JWT token  to be passed in the headers.

 * he request payload should contains the following parameters:
 * 
 * @param {string} trip_id: The trip id
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {number} latitude: The driver new latitude
 * @param {number} longitude: The driver new longitude
 * @param {number} km: The kilometers from user to driver
 */
module.exports = {
    method: 'POST',
    path: '/api/trackit/trip_coordinates',
    handler: register_location,
    config: {
        auth: {
            strategy: 'jwt'
        },
        validate: {
            payload: TripPositionTrackingValidator,
            failAction: handleError
        }
    }
}