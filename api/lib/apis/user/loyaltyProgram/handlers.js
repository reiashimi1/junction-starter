const Boom = require('@hapi/boom');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = {
    get: async (request, h) => {
        const { LoyaltyProgram, UserLoyaltyProgram } = request.server.app.models;
        const { airlineId } = request.params;
        const { user } = request.auth.credentials;


        try {
            const now = moment();
            const [loyaltyProgram] = await LoyaltyProgram.findAll({
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
            });

            if (!loyaltyProgram) {
                return Boom.notFound('No loyalty program found for this airline.');
            }

            const userProgress = await UserLoyaltyProgram.findOne({
                where: {
                    userId: user.id,
                    loyaltyProgramId: loyaltyProgram.id
                }
            })

            loyaltyProgram.dataValues.score = userProgress?.score || 0;
            return { loyaltyProgram };
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },
}
