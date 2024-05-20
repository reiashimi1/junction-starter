const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        type: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['passport']]
            },
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nid: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        issuingCountry: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        issueDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
    },
    options: {}
}
