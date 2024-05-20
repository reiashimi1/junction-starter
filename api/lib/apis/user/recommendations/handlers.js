const { Op } = require('sequelize');
const Wreck = require('@hapi/wreck');
const Boom = require("@hapi/boom");
const baseUrl = 'http://172.31.98.16:8088';

const getArticles = async ({ request, recomendations, user }) => {
    const { Offer, UserOffer, User, Flight } = request.server.app.models;
    const articles = [];

    for (const rec of recomendations) {
        const [origin, destination]  = rec.split('-');
        const offer = await Offer.findOne({
            where: {
                origin,
                destination
            },
        });

        if (offer) {
            offer.dataValues.type = 'offer';
            articles.push(offer);
        } else {
            const flight = await Flight.findOne({
                where: {
                    origin,
                    destination
                }
            });
            flight.dataValues.type = 'flight';
            articles.push(flight);
        }
    }

    return articles;
};

module.exports = {
    getPersonalized: async (request, h) => {
        const { user } = request.auth.credentials;
        const { userPassportNo } = request.pre;

        try {
            const uri = user.origin ? `/api/recommend/${userPassportNo}/${user.origin}` : `/api/recommend/${userPassportNo}`;
            const { payload } = await Wreck.get(uri, { baseUrl });
            const recs = JSON.parse(payload);
            const articles = await getArticles({ request, recomendations: recs, user });
            return { articles };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getPopular: async (request, h) => {
        const { user } = request.auth.credentials;
        try {
            const uri = user.origin ? `/api/popular/${user.origin}` : `/api/popular`;
            const { payload } = await Wreck.get(uri, { baseUrl });
            const recs = JSON.parse(payload).map(({ Id }) => Id);
            const articles = await getArticles({ request, recomendations: recs, user });
            return { articles };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getLatest: async (request, h) => {
        const { user } = request.auth.credentials;
        try {
            const uri = user.origin ? `/api/latest/${user.origin}` : `/api/latest`;
            const { payload } = await Wreck.get(uri, { baseUrl });
            const recs = JSON.parse(payload).map(({ Id }) => Id);
            const articles = await getArticles({ request, recomendations: recs, user });
            return { articles };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
