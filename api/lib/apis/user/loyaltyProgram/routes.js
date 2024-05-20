const Handlers = require('./handlers');

const Joi = require('joi');

module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/{airlineId}',
        options: {
            tags: ['api', 'user', 'airlines'],
            description: 'Get available loyalty programs of a user for an airline',
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                params: Joi.object({
                    airlineId: Joi.string().uuid().required()
                })
            }
        },
        handler: Handlers.get
    });
}
