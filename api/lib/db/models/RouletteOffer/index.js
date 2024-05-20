'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    return sequelize.define('rouletteOffers', ModelAttributes, ModelOptions);
}
