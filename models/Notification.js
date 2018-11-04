import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * This manage the Notification information
 * 
 * @constructor NotificationModel
 */
const NotificationModel = new Schema({
    ttp_latitude: Number,
    ttp_longitude: Number,
    client_id: String,
    driver_id: String,
    km: Number
}, {
        timestamps: { createdAt: 'created_at' }
    });


export default mongoose.model('Notification', NotificationModel);