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
        loyaltyProgramId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    options: {}
}
