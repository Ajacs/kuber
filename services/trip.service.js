import Trip from '../models/Trip';
import User from '../models/User';
import Boom from 'boom';

/**
 * This function creates a new Trip.
 * For now we only search for one driver instead of search for the 
 * nearest to the user. This function is asynchronous
 * 
 * @param {*} req 
 */
const createTrip = async(req) => {
    const { latitude, longitude } = req.payload;
    const client_id  = req.user.id;
    const trip = new Trip();
    let driver = null;
    try {
        driver = await User.findOne({driver: true});
    } catch(err) {
        return Boom.badRequest('Lo sentimos pero por el momento no tenemos choferes disponibles');
    }
    trip.driver = driver._id;
    trip.client = client_id;
    trip.client_latitude = latitude;
    trip.client_longitude = longitude;
    return trip.save(trip);
}

export {
    createTrip
}