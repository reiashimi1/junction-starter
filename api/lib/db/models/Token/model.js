const Sequelize = require('sequelize');

module.exports = {
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        refreshToken: {
            type: Sequelize.STRING(256),
            allowNull: true,
            unique: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        isExpired: {
            type: Sequelize.VIRTUAL,
            get() {
                if (!this.expiresAt) {
                    return true;
                }
                return this.expiresAt.getTime() <= Date.now();
            }
        }
    },
    options: {
        timestamps: true,
    }
}
