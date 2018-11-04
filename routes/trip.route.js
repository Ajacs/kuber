import { createUserTrip } from '../controllers/trip.controller';
import TripValidator from '../validators/TripValidator';

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
 * This endpoint manage the creation of a trip.
 * This endpoint need a JWT token  to be passed in the headers.
 * For now we have hardcoded the IP address to obtains the user
 * latitude and longitude.
 * T
 * he request payload should contains the following parameters:
 * 
 * @param {number} latitude: The user latitude
 * @param {number} longitude: The user longitude
 */
module.exports = {
    method: 'POST',
    path: '/api/trips',
    handler: createUserTrip,
    config: {
        auth: {
            strategy: 'jwt'
        },
        validate: {
            payload: TripValidator,
            failAction: handleError
        },
        plugins: {
            'hapi-geo-locate': {
                enabled: true,
                fakeIP: '189.215.157.209' //@TODO: Remove this when the code is on prod
            }
        }
    }
}