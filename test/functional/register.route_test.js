process.env.NODE_ENV = 'test';

import Server from '../../server';
import chai, { assert, expect } from 'chai';
import User from '../../models/User';


describe('REGISTER API', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    });

    it('should save a user when valid data', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                name: 'Macbook',
                lastname: 'Pro',
                email: 'test@test.com',
                password: 'thisisthetestpassword'
            })
        }
        const should = chai.should()
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload)
        const newUser = await User.findOne({ email: 'test@test.com' });
        assert.equal(response.statusCode, 200);
        should.exist(newUser)
        assert.equal(message, 'User created successfully')
    });

    it('should return a error message when password is missing', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                name: 'Macbook',
                lastname: 'Pro',
                email: 'test@test.com'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"password" is required')
    });

    it('should return a error message when email is missing', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                name: 'Macbook',
                lastname: 'Pro',
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"email" is required')
    });

    it('should return a error message when name is missing', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                lastname: 'Pro',
                email: 'test@test.com',
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"name" is required')
    });

    it('should return a error message when lastname is missing', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                name: 'Macbook',
                email: 'test@test.com',
                password: 'thisisthetestpassword'
            })
        }
        const response = await Server.inject(req);
        const { message } = JSON.parse(response.payload);
        const msg = JSON.parse(message);
        assert.equal(response.statusCode, 400)
        assert.equal(msg[0].message, '"lastname" is required')
    });

    it('should not let regiuster a user with an already registered email', async () => {
        const req = {
            method: 'POST',
            url: '/api/register',
            payload: JSON.stringify({
                name: 'Macbook',
                lastname: 'Pro',
                email: 'test@test.com',
                password: 'thisisthetestpassword'
            })
        }

        const userOne = await Server.inject(req);
        const userTwo = await Server.inject(req);
        const users = await User.find({})
        const { message } = JSON.parse(userTwo.payload);
        assert.equal(message, 'The email is already registered')
        assert.equal(userTwo.statusCode, 400)
        assert.equal(users.length, 1)
    });
})