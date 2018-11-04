import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * This manage the TripPositionTracking information
 * 
 * @constructor TripPositionTrackingModel
 */
const TripPositionTrackingModel = new Schema({
    trip_id: String,
    driver_id: String,
    client_id: String,
    latitude: Number,
    longitude: Number,
    km: Number
}, {
        timestamps: { createdAt: 'created_at' }
    });

export default mongoose.model('TripPositionTracking', TripPositionTrackingModel);