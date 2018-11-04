import { start } from '../controllers/simulation.controller';

/**
 * This endpoint starts a new simulation
 * Needs a valid user, so, before start with the simulation
 * you need to register a valid user in the system.
 * Should receive the following parameters:
 * 
 * @param {string} email: The user to use in the simulation
 * @param {string} password: The password for the user
 */
module.exports = {
    method: 'POST',
    path: '/api/simulation/start',
    handler: start,
    config: {
        plugins: {
            'hapi-geo-locate': {
              enabled: true,
              fakeIP: '189.215.157.209' //@TODO: Remove this when the code is on prod
            }
          }
    }
}