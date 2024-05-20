const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        loyaltyProgramId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        offerId: {
            type: Sequelize.UUID,
            allowNull: false,
        }
    },
    options: {}
}
