const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        airlineId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        origin: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    options: {}
}
