const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require("@hapi/boom");

module.exports = async (server, options) => {

    const userPassportNo = {
        assign: 'userPassportNo',
        async method(request, h) {
            const { user } = request.auth.credentials;

            await user.reload({
                include: 'document'
            })

            return user.document.number
        }
    }

    server.route({
        method: 'GET',
        path: '/personalized',
        options: {
            tags: ['api', 'user', 'airlines'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
            pre: [
                userPassportNo
            ]
        },
        handler: Handlers.getPersonalized
    });

    server.route({
        method: 'GET',
        path: '/popular',
        options: {
            tags: ['api', 'user', 'airlines'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getPopular
    });

    server.route({
        method: 'GET',
        path: '/latest',
        options: {
            tags: ['api', 'user', 'airlines'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getLatest
    });
}
