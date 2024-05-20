const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        rouletteId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        lastTryDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    options: {}
}
