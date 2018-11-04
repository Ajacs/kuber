import TripPositionTracking from '../models/TripPositionTracking';
import Boom from 'boom';

/**
 * This function register the driver new position.
 * The request.payload should have the following information:
 * 
 * @param {string} trip_id: The trip id
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {number} latitude: The driver new latitude
 * @param {number} longitude: The driver new longitude
 * @param {number} km: The kilometers from user to driver
 */
const register_location = req => {
    const { driver_id, client_id, trip_id, latitude, longitude, km } = req.payload;
    return TripPositionTracking.create({
        driver_id,
        client_id,
        trip_id,
        latitude,
        longitude,
        km
    }).then(trackItTripResource => {
        return {
            message: 'TrackIt register saved successfully',
            resource: trackItTripResource
        }
    }).catch(err => {
        return Boom.badRequest(err);
    })
}

export {
    register_location
}