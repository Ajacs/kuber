import { verifyToken } from '../controllers/authentication.controller';

/**
 * Function to validate the token for a driver user
 */
module.exports = {
    method: 'POST',
    path: '/api/drivers/validate',
    handler: verifyToken
}