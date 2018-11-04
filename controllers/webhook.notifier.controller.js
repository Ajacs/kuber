import Notification from '../models/Notification';
import Boom from 'boom';

/**
 * This function creates a new notification in the system
 * 
 * @param {Object} req 
 * 
 * The request.payload should hae the following parameters:
 * 
 * @param {number} ttp_latitude: The latitude provided by trackit service
 * @param {number} ttp_longitude: The longitude provided by trackit service
 * @param {string} client_id: The client id
 * @param {string} driver_id: The driver id
 * @param {string} trip_id: The trip id
 * @param {number} km: The kilometers from trackit service
 * 
 */
const create_notification = req => {
    const { ttp_latitude, ttp_longitude, client_id, driver_id, trip_id, km } = req.payload;
    // Create a new notification record
    return Notification.create({ ttp_latitude, ttp_longitude, client_id, driver_id, trip_id, km })
        .then(notification => {
            console.log(`Notification Created Successfully id: ${notification.id}`);
            return {
                message: 'Notification created successfully',
                notification
            }
        }).catch(err => {
            return Boom.badRequest(err);
        });
}

export {
    create_notification
}