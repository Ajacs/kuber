process.env.NODE_ENV = 'test';

import Server from '../../server';
import { assert } from 'chai';
import User from '../../models/User';
import '../test_helper';


describe('Authenticate API', () => {
    beforeEach(async() => {
        await User.create({
            name: 'TestUser',
            lastname: 'TestUserLastname',
            email: 'test@test.com',
            password: 'thisisthetestpassword'
        })
    })
    it('should return a valid JWT token with valid credentials', async() => {
        const req = {
            method: 'POST',
            url: '/api/authenticate',
            payload: JSON.stringify({
                email: 'test@test.com',
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        assert.equal(response.statusCode, 200)
    });

    it('should show an error when the user does not exists', async () => {
        const req = {
            method: 'POST',
            url: '/api/authenticate',
            payload: JSON.stringify({
                email: 'inexistent_email@test.com',
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload)
        assert.equal(response.statusCode, 404)
        assert.equal(message, 'User does not exist')
    });

    it('should show an error when the user send invalid password', async() => {
        const req = {
            method: 'POST',
            url: '/api/authenticate',
            payload: JSON.stringify({
                email: 'test@test.com',
                password: 'invalidpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload)
        assert.equal(response.statusCode, 404)
        assert.equal(message, 'Invalid email or password')
    });

    it('should show an error when the payload does not contains password', async () => {
        const req = {
            method: 'POST',
            url: '/api/authenticate',
            payload: JSON.stringify({
                email: 'test@test.com'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg  = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"password" is required')
    })

    it('should show an error when the payload does not contains email', async () => {
        const req = {
            method: 'POST',
            url: '/api/authenticate',
            payload: JSON.stringify({
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg  = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"email" is required')
    })
})
