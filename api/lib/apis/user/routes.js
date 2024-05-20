const Handlers = require('./handlers');
const Joi = require('joi');

module.exports = async (server, options) => {
    server.route({
        method: 'POST',
        path: '/populate',
        options: {
            auth: false
        },
        handler: Handlers.populate
    });

    server.route({
        method: 'GET',
        path: '/airlines',
        options: {
            tags: ['api', 'user', 'airlines'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getAirlines
    });

    server.route({
        method: 'GET',
        path: '/offers',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.getOffers
    });

    server.route({
        method: 'GET',
        path: '/offers/{offerId}/redeem',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.redeemOffer
    });

    server.route({
        method: 'GET',
        path: '/roulette/{rouletteId}/spin',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
        },
        handler: Handlers.spinRoulette
    });

    server.route({
        method: 'GET',
        path: '/search-flights',
        options: {
            tags: ['api', 'user', 'offers'],
            auth: {
                access: {
                    scope: ['user']
                }
            },
            validate: {
                query: Joi.object({
                    origin: Joi.string().required(),
                    destination: Joi.string().required(),
                })
            }
        },
        handler: Handlers.searchFlights
    });
}
