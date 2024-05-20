'use strict';
const Joi = require('joi');
const { attributes: ModelAttributes, options: ModelOptions } = require('./model');
const SchemaValidation = require('./validation');

module.exports = (server, options, sequelize) => {

    const Token = sequelize.define('token', ModelAttributes, ModelOptions);

    Token.schema = function () {
        return SchemaValidation
    }

    // Token.addHook('afterValidate', 'joiValidation', async (token, options) => {
    //     const { error, value } = SchemaValidation.complete.validate(token.dataValues)
    //     if (error) throw new Error(error);
    // });

    return Token;
}
