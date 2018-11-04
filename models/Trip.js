import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * This manage the trip information
 * 
 * @constructor TripModel
 */
const TripModel = new Schema({
    driver: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    client_latitude: Number,
    client_longitude: Number
}, {
        timestamps: { createdAt: 'created_at' }
    });


export default mongoose.model('Trip', TripModel);