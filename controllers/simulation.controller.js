import config  from '../config';
import request from 'axios';
import User from '../models/User';
import TripTrackingPosition from '../models/TripPositionTracking';
import Trip from '../models/Trip';
import Notification from '../models/Notification';
import { queues, WEBHOOK_NOTIFICATION } from '../queues';

const newDriver = {
    email: 'thesuperdriver@drivers.com',
    password: 'thisisthesupersecurepassword',
    driver: true
}


/**
 * Returns a valid url 
 * 
 * @param {string} endpoint: The endpoint to search in the configuration file
 */
const getUrl = endpoint => `http://${config.server.host}:${config.server.port}${config.api.endpoint[endpoint]}`

/**
 * Returns a user token
 * 
 * @param {*} email 
 * @param {*} password 
 * 
 * @return {Promise} 
 */
const getUserToken = (email, password) => {
    const authenticateUrl = getUrl('authenticate');
    return request.post(authenticateUrl, { email, password });
}

/**
 * Creates a new trip
 * @param {*} config 
 * 
 * The config object need the following keys:
 * 
 * @param {number} latitude: The latitude of the user
 * @param {number} longitude: The longitude of the user
 * @param {string} token: The user token to validate
 * 
 * @return {Promise}
 */
const createTrip = config => {
    const tripsUrl = getUrl('trips');
    const { latitude, longitude, token } = config;

    return request.post(tripsUrl, { latitude, longitude }, {
        headers: {
            'Authorization': token
        }
    });
}

/**
 * Returns the kilometers
 * 
 * @param {*} counter 
 * @param {*} tripId 
 */
const getKm = async (counter, tripId) => {
    let km = 1
    if (counter !== 0) {
        // Get the last record from trackit
        const last_ttp = await TripTrackingPosition.findOne({ trip_id: tripId }).sort({ field: 'asc', _id: -1 }).limit(1);
        km = last_ttp.km;
        km = ((km * 1000) - 100) / 1000
    }
    return km;
}

/**
 * This function manage the execution of the simulation
 * 
 * @param {Object} data 
 * 
 * data needs the following properties:
 * 
 * @param {number} latitude: The user latitude
 * @param {number} longitude: The user longitude
 * @param {string} clientId: This is the client id that start the trip
 * @param {string} driverId: This is driver id
 * @param {string} driverToken: The token to authenticate the driver requests
 * @param {tripId} tripId: The trip id   
 */
const manageExecutions = data => {
    let counter = 0;
    const {
        latitude,
        longitude,
        clientId: client_id,
        driverId: driver_id,
        driverToken,
        tripId: trip_id
    } = data;
    const interval = setInterval(async() => {
        if (counter === 10) {
            clearInterval(interval);
        } else {
            const { host: coordinates_server_host, port: coordinates_server_port } = config.coordinates_server;
            const { host: kuber_host, port: kuber_port } = config.server;
            const newCoordinateUrl = `http://${coordinates_server_host}:${coordinates_server_port}${config.api.endpoint['coordinates']}`;
            const tripTrackPosition = `http://${kuber_host}:${kuber_port}${config.api.endpoint['tripPositionTracking']}`;
            const km = await getKm(counter, trip_id)
            try {
                // Get the new coordinates
                const new_coordinates = await request.post(newCoordinateUrl, { latitude, longitude, km }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const { latitude: new_latitude, longitude: new_longitude } = new_coordinates.data;
                // Register the new trip_tracking_position
                let ttp_latitude = counter === 0 ? latitude : new_latitude
                let ttp_longitude = counter === 0 ? longitude : new_longitude
                const trackItRecord = await request.post(tripTrackPosition, { trip_id, driver_id, client_id, latitude: ttp_latitude, longitude: ttp_longitude, km }, {
                    headers: {
                        'Authorization': driverToken
                    }
                });
                // Add data in order to do executed by the Job
                const { _id } = trackItRecord.data.resource;
                queues[WEBHOOK_NOTIFICATION].add({
                    trackItRecord: _id,
                    ttp_latitude,
                    ttp_longitude,
                    client_id,
                    driver_id,
                    trip_id,
                    km
                });
            } catch (err) {
                console.log('MANAGE ERROR');
                console.log(err);
            }
            // Finally increment the counter
            counter += 1;
        }
    }, config.simulation.repeat_every);
}

/**
 * Summary.
 * 
 * Start with the simulation
 * 
 * 
 * First of all when a new simulation is requested the system clean the database
 * this for the test purpose.
 * 
 * @param {*} req 
 */
const start = async req => {
    console.log('STARTING SIMULATION');
    //const [latitude, longitude] = req.location.loc.split(',');
    const latitude = await parseFloat('16.9308');
    const longitude = await parseFloat('-99.8858');
    const { email: clientEmail, password: clientPassword } = req.payload;
    try {
        await Trip.deleteMany({});
        await TripTrackingPosition.deleteMany({})
        await User.deleteOne({driver: true})
        await User.create(newDriver);
        await Notification.deleteMany({})
        const { email: driverEmail, id: driverId } = await User.findOne({ driver: true });
        const { data: driverToken } = await getUserToken(driverEmail, newDriver.password);
        const { data: token } = await getUserToken(clientEmail, clientPassword);
        const trip = await createTrip({ latitude, longitude, token });
        const clientId = trip.data.trip.client;
        const tripId = trip.data.trip._id;
        manageExecutions({
            latitude,
            longitude,
            clientId,
            driverId,
            driverToken,
            tripId
        });
        return { message: 'Simmulation started successfully' }
    } catch (err) {
        console.log('ERROR');
        console.log(err);
    }
}


export { start}
