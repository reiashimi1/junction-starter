const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {

    const { Auth: AuthHelpers } = server.app.helpers;

    server.route({
        method: 'POST',
        path: '/auth/register',
        options: {
            auth: false,
            description: 'Register route',
            tags: ['api', 'auth', 'register'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().trim().required(),
                    email: Joi.string().trim().required(),
                    passportNumber: Joi.string().trim().required(),
                    birthday: Joi.date().required(),
                    role: Joi.string().valid('user', 'airline').default('user')
                })
            },
            pre: [
                {
                    assign: 'mapper',
                    async method (request, h) { return server.app.resources.user.modelMapper }
                }
            ]
        },
        handler: Handlers.register
    });

    server.route({
        method: 'POST',
        path: '/auth/airline/register',
        options: {
            auth: false,
            description: 'Register route airline',
            tags: ['api', 'auth', 'airline-register'],
            validate: {
                payload: Joi.object({
                    password: Joi.string().trim().required(),
                    email: Joi.string().trim().required(),
                    role: Joi.string().valid('airline').required(),
                    airlineName: Joi.string().trim().required(),
                    airlineCode: Joi.string().trim().required(),
                })
            },
            pre: [
                {
                    assign: 'mapper',
                    async method (request, h) { return server.app.resources.user.modelMapper }
                }
            ]
        },
        handler: Handlers.registerAirline
    });

    server.route({
        method: 'POST',
        path: '/auth/login',
        options: {
            auth: false,
            description: 'Login route',
            tags: ['api', 'auth', 'login'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().trim().required(),
                    password: Joi.string().trim().required(),
                })
            },
            pre: [
                {
                    assign: 'auth',
                    async method(request, h) {
                        return new AuthHelpers(options.auth)
                    }
                },
                {
                    assign: 'mapper',
                    async method (request, h) {
                        return server.app.resources.user.modelMapper
                    }
                }
            ],
        },
        handler: Handlers.login
    });

    server.route({
        method: 'POST',
        path: '/auth/logout',
        options: {
            auth: 'auth',
            description: 'User logs out',
            tags: ['api', 'auth', 'logout'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required(),
                }).label('UserLogoutPayload')
            },
        },
        handler: Handlers.logout
    });

    server.route({
        method: 'POST',
        path: '/auth/token',
        options: {
            auth: false,
            description: 'Get an access token with a refresh token',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required()
                }).label('GetTokenPayload')
            },
            pre: [
                {
                    assign: 'auth',
                    async method(request, h) {
                        return new AuthHelpers(options.auth)
                    }
                }
            ]
        },
        handler: Handlers.getNewAccessToken
    });
}
