import Joi from 'joi';

/**
 * This makes the validation for a Notification payload.
 * The request.payload should contains the fields:
 * 
 * @param {number} ttp_latitude: The latitude provided by trackit service
 * @param {number} ttp_longitude: The longitude provided by trackit service
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {string} trip_id: The trip id
 * @param {number} km: The kilometers from trackit service
 */
const NotificationValidator = Joi.object({
    ttp_latitude: Joi.number().required(),
    ttp_longitude: Joi.number().required(),
    client_id: Joi.string().required(),
    driver_id: Joi.string().required(),
    trip_id: Joi.string().required(),
    km: Joi.number().required()
});

export default NotificationValidator;