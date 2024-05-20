const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { title, origin, destination, imageUrl, description } = request.payload;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { Flight } = request.server.app.models;

        try {
            const flight = await Flight.create({
                title, origin, destination, imageUrl, description,
                airlineId: airline.id
            })

            return { flight }

        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getAll: async (request, h) => {
        const { Flight } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;

        const flights = await Flight.findAll({
            where: {
                airlineId: airline.id
            }
        })

        return { flights }
    },

    getOne: async (request, h) => {
        const { Flight } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        const flight = await Flight.findOne({
            where: {
                airlineId: airline.id,
                id
            }
        })

        return { flight }
    },

    delete: async (request, h) => {
        const { Flight } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        const flight = await Flight.findOne({
            where: {
                airlineId: airline.id,
                id
            }
        })

        try {
            await flight.destroy();
            return { message: 'Flight deleted' }
        } catch (err) {
            return Boom.badImplementation(err)
        }
    }
}
