const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        offerId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        rouletteId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    },
    options: {}
}
