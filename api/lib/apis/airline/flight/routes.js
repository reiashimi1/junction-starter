const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {

    server.route({
        method: 'POST',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create airline flight',
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    origin: Joi.string().allow(null),
                    destination: Joi.string().allow(null),
                    imageUrl: Joi.string().allow(null),
                    description: Joi.string().allow(null),
                })
            },
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Create airline flight',
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Get one',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                })
            },
        },
        handler: Handlers.getOne
    });

    server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['airline']
                }
            },
            description: 'Delete',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                })
            },
        },
        handler: Handlers.delete
    });
}
