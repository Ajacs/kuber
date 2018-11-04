import Joi from 'joi';

/**
 * This makes the validation for a new trip payload.
 * The request.payload should contains the fields:
 * 
 * @param {number} latitude: The user registered email
 * @param {number} longitude: The user registered password
 */
const TripJoiValidator = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
});

export default TripJoiValidator;