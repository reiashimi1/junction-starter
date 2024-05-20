const Handlers = require('./handlers');
const { joiRequiredEmailTrimmed } = require('../../helpers/joi-schemas');
const Joi = require('joi');

module.exports = async (server, options) => {
    server.route({
        method: 'PUT',
        path: '/booking',
        options: {
            tags: ['booking'],
            auth: false,
        },
        handler: Handlers.createBooking
    });
}
