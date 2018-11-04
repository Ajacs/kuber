import dotenv from 'dotenv';
dotenv.config();

export default {
    development: {
        server: {
            port: process.env.SERVER_PORT,
            host: process.env.SERVER_HOST,
            mongourl: process.env.MONGO_URL
        },
        coordinates_server: {
            port: process.env.COORDINATES_SERVER_PORT,
            host: process.env.COORDINATES_SERVER_HOST
        },
        authentication: {
            secret: process.env.AUTHENTICATION_SECRET,
            algorithms: process.env.AUTHENTICATION_ALGORITHMS,
            expiresIn: process.env.AUTHENTICATION_TOKEN_EXPIRES_IN
        }
    },
    test: {
        server: {
            port: process.env.SERVER_PORT,
            host: process.env.SERVER_HOST,
            mongourl: process.env.MONGO_URL_TEST
        },
        coordinates_server: {
            port: process.env.COORDINATES_SERVER_PORT,
            host: process.env.COORDINATES_SERVER_HOST
        },
        authentication: {
            secret: process.env.AUTHENTICATION_SECRET,
            algorithms: process.env.AUTHENTICATION_ALGORITHMS,
            expiresIn: process.env.AUTHENTICATION_TOKEN_EXPIRES_IN
        }
    },
    common: {
        api: {
            endpoint: {
                'authenticate': '/api/authenticate',
                'validate': '/api/validate',
                'trips': '/api/trips',
                'coordinates': '/api/coordinates',
                'tripPositionTracking': '/api/trackit/trip_coordinates',
                'webhook': '/api/webhooks/notifier'
            }
        },
        simulation: {
            repeat_every: process.env.SIMULATION_REPEAT_EVERY
        }
    }
}
