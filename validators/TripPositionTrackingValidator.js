import Joi from 'joi';

/**
 * This makes the validation for a TripPositionTracking payload.
 * The request.payload should contains the fields:
 * 
 * @param {string} trip_id: The trip id
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {number} latitude: The driver new latitude
 * @param {number} longitude: The driver new longitude
 * @param {number} km: The kilometers from user to driver
 */
const TripPositionTrackingValidator = Joi.object({
    trip_id: Joi.string().required(),
    client_id: Joi.string().required(),
    driver_id: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    km: Joi.number().required()
});

export default TripPositionTrackingValidator;