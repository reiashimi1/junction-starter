'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    const UserLoyaltyProgram = sequelize.define('userLoyaltyProgram', ModelAttributes, ModelOptions);
    return UserLoyaltyProgram;
}
