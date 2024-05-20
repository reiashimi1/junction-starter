const Handlers = require('./handlers');
const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = async (server, options) => {

    // server.route({
    //     method: 'POST',
    //     path: '/',
    //     options: {
    //         auth: {
    //             access: {
    //                 scope: ['airline']
    //             }
    //         },
    //         description: 'Create airline roulette',
    //         validate: {
    //             payload: Joi.object({
    //                 rewardingScheme: Joi.string().required()
    //             })
    //         },
    //     },
    //     handler: Handlers.create
    // });

}
