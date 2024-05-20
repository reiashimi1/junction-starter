const Boom = require('@hapi/boom');
const {Sequelize} = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;

module.exports = {
    getRoulette: async (request, h) => {
        const { airlineId } = request.params;
        const { Roulette, UserRoulette } = request.server.app.models;
        const { user } = request.auth.credentials;

        try {
            const now = moment();
            const roulette = await Roulette.findOne({
                where: {
                    airlineId,
                    startDate: {
                        [Op.lte]: now
                    },
                    endDate: {
                        [Op.gte]: now
                    }
                },
                include: ['offers'],
                order: [['endDate', 'asc']],
                limit: 1
            })

            if (!roulette) {
                return { exists: false }
            }

            const userRoulette = await UserRoulette.findOne({
                where: {
                    userId: user.id,
                    rouletteId: roulette.id,
                }
            });

            roulette.dataValues.canBeClicked = true;

            if (userRoulette) {
                roulette.dataValues.canBeClicked =
                    moment().diff(moment(userRoulette.lastTryDate), 'minutes') >= 1;
            }

            return { roulette, exists: true };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
