import Hapi from 'hapi';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';
import User from './models/User';
import { config } from './config';

const { config } = require('./config');
const MongoDBUrl = config.server.mongourl;
const server = new Hapi.Server({
    port: config.server.port,
    host: config.server.host
});
require('dotenv').config();

/**
 * Server for Kuber.
 * 
 * This creates a new server and do the connection with 
 * Mongo database. Kuber uses JWT as authentication mechanism.
 * 
 * The routes are in individual files, the system scan the routes
 * folder and register a new route for each file. Each file should
 * ends with : '*.route.js'
 */
const startServer = async () => {

    const validate = async function (decoded, request) {
        if (!User.findOne({id: decoded.id})) {
            return { isValid: false };
        }
        else {
            request.user = decoded;
            return { isValid: true }
        }
    };

    await server.register(require('hapi-auth-jwt2'));
    await server.register({ plugin: require('hapi-geo-locate')});
    server.auth.strategy('jwt', 'jwt', {
        key: config.authentication.secret,
        validate,
        verifyOptions: { algorithms: config.authentication.algorithms }
    });
    // Register the routes
    glob.sync('./routes/*.route.js', {
        root: __dirname
    }).forEach(file => {
        const route = require(path.join(__dirname, file));
        server.route(route);
    });
    await server.start();
    return server;
}

startServer().then(server => {
    mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});

export default server;