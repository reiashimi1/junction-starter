const Boom = require('@hapi/boom');
module.exports = {
    getAll: async (request, h) => {
        const {Offer} = request.server.app.models;
        const {user} = request.auth.credentials;
        
        try {
            const offers = await Offer.findAll({
                where: {
                    airlineId: user.airline.id,
                    isReward: true
                }
            })

            return {offers}
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    create: async (request, h) => {
        const {type, discount, startDate, endDate, title, imageUrl, description, origin, destination } = request.payload;
        const {Offer} = request.server.app.models;
        const {user} = request.auth.credentials;
        const {airline} = user;

        try {
            const offer = await Offer.create({
                type,
                discount,
                startDate,
                endDate,
                title,
                imageUrl,
                description,
                airlineId: airline.id,
                origin,
                destination,
                isReward: true
            })

            return {offer}
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    update: async (request, h) => {
        const { Offer } = request.server.app.models;
        const { id } = request.params;
        const { user } = request.auth.credentials;
        const { airline } = user;

        try {
            const offer = await Offer.findOne({
                where: {
                    id,
                    airlineId: airline.id
                }
            });

            if (!offer) {
                return Boom.notFound();
            }

            await offer.update(request.payload);
            return { ok: 'ok' };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getOne: async (request, h) => {
        const {Offer} = request.server.app.models;
        const {id} = request.params;

        const offer = await Offer.findOne({
            where: {
                id
            }
        })

        return {offer}
    },

    delete: async (request, h) => {
        const {Offer} = request.server.app.models;
        const {id} = request.params;

        const offer = await Offer.findOne({
            where: {
                id
            }
        })

        if (!offer) {
            return Boom.notFound('Offer not found')
        }

        try {
            await offer.destroy();
            return {message: 'Offer deleted'}
        } catch (err) {
            return Boom.badImplementation(err)
        }
    }
}
