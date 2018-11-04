import { create_notification } from '../controllers/webhook.notifier.controller';
import NotificationValidator from '../validators/NotificationValidator';

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
 * This endpoint manage the notifications to send to a user
 * The request.payload shoul have the following parameters:
 * 
 * @param {number} ttp_latitude: The latitude provided by trackit service
 * @param {number} ttp_longitude: The longitude provided by trackit service
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {string} trip_id: The trip id
 * @param {number} km: The kilometers from trackit service
 */
module.exports = {
    method: 'POST',
    path: '/api/webhooks/notifier',
    handler: create_notification,
    config: {
        validate: {
            payload: NotificationValidator,
            failAction: handleError
        },
    }
}