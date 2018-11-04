import config from './config';

const { development, test, common } = config;

module.exports = {
    development: Object.assign({}, development, common),
    test: Object.assign({}, test, common)
}[process.env.NODE_ENV] || 'development'