import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

/**
 * Summary.
 * 
 * This manage the user data.
 * @constructor UserModel
 */
const UserModel = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        //index: { unique: true }
    },
    password: String,
    driver: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: { createdAt: 'created_at' }
    });

/**
 * This hook generates a hash from the user password.
 * It generates a salt from Bcrypt library.
 */
UserModel.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(this.password, salt);
    this.password = password_hash;
    return this;
});

export default mongoose.model('User', UserModel);
