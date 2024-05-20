const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['admin', 'airline', 'user']]
            },
            allowNull: false
        },
        externalUserId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: true
        },
        travelerId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        airlineId: {
            type: Sequelize.UUID,
            allowNull: true
        },
        origin: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    options: {}
}
