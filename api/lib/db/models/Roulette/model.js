const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        eventName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        airlineId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: true
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    options: {}
}
