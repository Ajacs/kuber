import { WEBHOOK_NOTIFICATION } from '../queues';
import axios from 'axios';
import config from '../config';

/**
 * This Job receives the data in order to do a Notification
 */
const processor = {
    [WEBHOOK_NOTIFICATION]: () => async (job) => {
        const { 
            ttp_latitude, 
            ttp_longitude, 
            client_id, 
            driver_id, 
            trip_id, 
            km 
        } = job.data;
        const { host, port } = config.server;
        const webhookNotifierUrl = `http://${host}:${port}${config.api.endpoint['webhook']}`;
        await axios.post(webhookNotifierUrl, { ttp_latitude, ttp_longitude, client_id, driver_id, trip_id, km }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default processor;