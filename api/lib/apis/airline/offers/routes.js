const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {
    server.route({
        method: 'GET',
        path: '/',
        options: {
            tags: ['api', 'airline', 'offers'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get airline offers',
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'PUT',
        path: '/{id}',
        options: {
            tags: ['api', 'airline', 'offers'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create offer',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }),
                payload: Joi.object({
                    type: Joi.string().required(),
                    title: Joi.string().required(),
                    origin: Joi.string().allow(null),
                    destination: Joi.string().allow(null),
                    imageUrl: Joi.string().allow(null),
                    description: Joi.string().allow(null),
                    discount: Joi.number().max(1),
                    startDate: Joi.string().required(),
                    endDate: Joi.string().required(),
                })
            },
        },
        handler: Handlers.update
    });

    server.route({
        method: 'POST',
        path: '/',
        options: {
            tags: ['api', 'airline', 'offers'],
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create offer',
            validate: {
                payload: Joi.object({
                    type: Joi.string().required(),
                    title: Joi.string().required(),
                    origin: Joi.string().allow(null),
                    destination: Joi.string().allow(null),
                    imageUrl: Joi.string().allow(null),
                    description: Joi.string().allow(null),
                    discount: Joi.number().max(1),
                    startDate: Joi.string().required(),
                    endDate: Joi.string().required(),
                })
            },
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            tags: ['api', 'airline', 'offers'],
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
            tags: ['api', 'airline', 'offers'],
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
