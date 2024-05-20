'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    const LoyaltyProgramOffer = sequelize.define('loyaltyProgramOffers', ModelAttributes, ModelOptions);
    return LoyaltyProgramOffer;
}
