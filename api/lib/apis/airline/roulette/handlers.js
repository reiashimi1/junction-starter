const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { eventName, startDate, endDate, offerIds } = request.payload;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { Roulette, Offer } = request.server.app.models;

        try {

            const roulette = await Roulette.create({
                eventName,
                startDate,
                endDate,
                airlineId: airline.id
            })

            const offers = await Offer.findAll({
                where: {
                    id: offerIds
                }
            })

            await roulette.setOffers(offers)

            await roulette.reload({ include: 'offers' })

            return roulette

        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getAll: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;

        const roulettes = await Roulette.findAll({
            where: {
                airlineId: airline.id
            },
            include: 'offers'
        })

        return { roulettes }
    },

    getOne: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        const roulette = await Roulette.findOne({
            where: {
                airlineId: airline.id,
                id
            },
        })

        return { roulette }
    },

    delete: async (request, h) => {
        const { Roulette } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { airline } = user;
        const { id } = request.params;

        const roulette = await Roulette.findOne({
            where: {
                airlineId: airline.id,
                id
            }
        })

        if (!roulette) {
            return Boom.notFound('Roulette not found')
        }

        try {
            await roulette.setOffers([]);
            await roulette.destroy();
            return { message: 'Roulette deleted' }
        } catch (err) {
            return Boom.badImplementation(err)
        }
    },
}
