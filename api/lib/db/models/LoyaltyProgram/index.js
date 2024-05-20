'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    const LoyaltyProgram = sequelize.define('loyaltyProgram', ModelAttributes, ModelOptions);
    return LoyaltyProgram;
}
