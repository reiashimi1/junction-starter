'use strict';

const { attributes: ModelAttributes, options: ModelOptions } = require('./model');

module.exports = async (server, options, sequelize) => {
    return sequelize.define('offer', ModelAttributes, ModelOptions);
}
