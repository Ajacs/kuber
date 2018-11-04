import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.server.mongourl)
before(done => {    
    mongoose.connection.once('open', () => {
        console.log('Connected to the test database');
    })
    done();
})

after(done => {
    console.log('Drop test database');
    mongoose.connection.db.dropDatabase(done);
    done();
})