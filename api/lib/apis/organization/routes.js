const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {

    const organization = {
        assign: 'organization',
        async method(request, h) {
            const { Organization } = server.app.models;
            const { id } = request.params;
            const { user } = request.auth.credentials;
            const { id: userId } = user;

            const organization = await Organization.findOne({
                where: {
                    id,
                    userId
                }
            })

            if (!organization) {
                return Boom.notFound('Organization not found')
            }

            return organization
        }
    }

    server.route({
        method: 'POST',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Create an organization',
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            },
            pre: [
                {
                    assign: 'mapper',
                    async method(request, h) {
                        return server.app.resources.organization.modelMapper
                    }
                }
            ]
        },
        handler: Handlers.create
    });

    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Get users organizations',
            validate: {},
            pre: [
                {
                    assign: 'mapper',
                    async method(request, h) {
                        return server.app.resources.organization.listMapper
                    }
                }
            ]
        },
        handler: Handlers.getAll
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Get users organization',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
            pre: [
                {
                    assign: 'mapper',
                    async method(request, h) {
                        return server.app.resources.organization.modelMapper
                    }
                },
                organization
            ]
        },
        handler: Handlers.getOne
    });

    server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
            auth: {
                access: {
                    scope: ['user']
                }
            },
            description: 'Get users organizations',
            validate: {
                params: Joi.object({
                    id: Joi.string().uuid().required()
                }).required()
            },
            pre: [
                organization
            ]
        },
        handler: Handlers.delete
    });

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     options: {
    //         auth: false,
    //         description: 'Register route',
    //         validate: {
    //             payload: Joi.object({
    //                 username: Joi.string().required(),
    //                 password: Joi.string().required(),
    //             })
    //         },
    //         pre: [
    //             {
    //                 assign: 'auth',
    //                 async method(request, h) {
    //                     return new AuthHelpers(options.auth)
    //                 }
    //             },
    //         ],
    //     },
    //     handler: Handlers.login
    // });
}
