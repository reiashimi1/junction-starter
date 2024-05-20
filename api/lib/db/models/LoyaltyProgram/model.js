const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        thresholdType: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['points', 'miles', 'flights']]
            },
            allowNull: false
        },
        threshold: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        airlineId: {
            type: Sequelize.UUID,
            allowNull: false
        }
    },
    options: {}
}
