const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {
    server.route({
        method: 'POST',
        path: '/',
        options: {
            tags: ['api', 'airline', 'roulette'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create airline roulette',
            validate: {
                payload: Joi.object({
                    eventName: Joi.string().required(),
                    startDate: Joi.date().allow(null),
                    offerIds: Joi.array().items(Joi.string().uuid()),
                    endDate: Joi.date().allow(null),
                })
            },
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/',
        options: {
            tags: ['api', 'airline', 'roulette'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get airline roulettes',
            validate: {},
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            tags: ['api', 'airline', 'roulette'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get airline roulette',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
        },
        handler: Handlers.getOne
    });

    server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
            tags: ['api', 'airline', 'roulette'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get users organizations',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
        },
        handler: Handlers.delete
    });
}
