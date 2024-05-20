const Boom = require('@hapi/boom');
const Wreck = require('@hapi/wreck');
const moment = require('moment');

module.exports = {
    createBooking: async (request, h) => {
        const { Offer, UserOffer, User, Document, Flight, Airline, UserLoyaltyProgram, LoyaltyProgram } = request.server.app.models;
        const {
            offerId,
            origin,
            destination,
            documentNumber,
            passengerType,
            airlineCode,
            bookingClass,
        } = request.payload;

        try {
            let offer = null;

            const headers = {
                'content-type': 'application/json; charset=utf-8',
            }

            const baseUrl = 'http://172.31.98.16:8088';
            const now = moment();

            const user = await User.findOne({
                include: [
                    {
                        model: Document,
                        where: {
                            number: documentNumber
                        }
                    }
                ]
            });
            await user.update({ origin });

            const airline = await Airline.findOne({
                where: {
                    code: airlineCode
                }
            })

            await Flight.create({
                airlineId: airline.id,
                title: 'City of History and Culture',
                imageUrl: 'https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350-1?wid=1600&hei=900&fit=constrain,1&fmt=webp',
                description: 'This is Lorem Ipsum Test',
                origin,
                destination
            })

            await Wreck.post('/api/user', {
                baseUrl,
                headers,
                payload: {
                    Labels: [origin, user.document.issuingCountry],
                    UserId: documentNumber
                }
            });

            await Wreck.post('/api/item', {
                baseUrl,
                headers,
                payload: {
                    Categories: [origin],
                    IsHidden: false,
                    ItemId: `${origin}-${destination}`,
                    Labels: [destination, bookingClass],
                    Timestamp: now
                }
            });

            await Wreck.post('/api/feedback', {
                baseUrl,
                headers,
                payload: [
                    {
                        FeedbackType: "book",
                        ItemId: `${origin}-${destination}`,
                        Timestamp: now,
                        UserId: documentNumber
                    },
                ]
            });

            const alp = await LoyaltyProgram.findOne({
                where: {
                    airlineId: airline.id
                },
                include: ['offers']
            });

            if (alp) {
                const [loyaltyProgram, created] = await UserLoyaltyProgram.findOrCreate({
                    where: {
                        userId: user.id,
                        loyaltyProgramId: alp.id,
                    },
                    defaults: {
                        score: 1
                    }
                });

                if (!created) {
                    await loyaltyProgram.update({ score: loyaltyProgram.score + 1 });
                }

                if (loyaltyProgram.score >= alp.threshold) {
                    await loyaltyProgram.update({ score: 0 });
                    await UserOffer.create({
                        userId: user.id,
                        offerId: alp.offers[0].id
                    });
                }
            }

            if (offerId) {
                offer = await Offer.findByPk(offerId, {
                    include: ['users']
                });

                if (!offer) {
                    return Boom.notFound('Offer not found');
                }

                if (offer.users.map(u => u.id).includes(user.id)) {
                    return { ok: 'ok' };
                }

                const where = { userId: user.id };
                where.offerId = offerId;
                const ex = await UserOffer.findOne({ where });
                if (!ex) { return { ok: 'ok' } }
                await ex.update({ bookingId: offerId })
            }

            return { ok: 'ok' };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    }
};
