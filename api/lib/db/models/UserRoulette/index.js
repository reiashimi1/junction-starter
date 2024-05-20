'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    const UserRoulette = sequelize.define('userRoulette', ModelAttributes, ModelOptions);
    return UserRoulette;
}
