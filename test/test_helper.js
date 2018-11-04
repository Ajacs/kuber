import mongoose from 'mongoose';
import { test }  from '../config';

before(done => {
    mongoose.connect(test.server.mongourl)
})