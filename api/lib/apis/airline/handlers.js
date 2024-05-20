const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { rewardingScheme } = request.payload;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { Config } = request.server.app.models;

        try {
            return await Config.create({
                rewardingScheme,
                airlineId: airline.id
            })

        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getAll: async (request, h) => {
        const { Config } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;

        return await Config.findAll({
            where: {
                airlineId: airline.id
            }
        })
    },

    getOne: async (request, h) => {
        const { Config } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        return await Config.findOne({
            where: {
                airlineId: airline.id
            }
        })
    },

    delete: async (request, h) => {
        const { Config } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;

        const config = await Config.findOne({
            where: {
                airlineId: airline.id
            }
        })

        try {
            await config.destroy();
            return { message: 'Configuration deleted' }
        } catch (err) {
            return Boom.badImplementation(err)
        }
    }
}
