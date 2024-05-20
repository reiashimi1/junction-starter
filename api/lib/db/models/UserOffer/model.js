const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        offerId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        bookingId: {
            type: Sequelize.UUID,
            allowNull: true,
        }
    },
    options: {}
}
