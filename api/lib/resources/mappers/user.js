'use strict';

const { _modelMapper: airlineMapper } = require('./Airline');

const _modelMapper = (user) => {
    const airline = user.airline ? airlineMapper(user.airline) : null;

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        airline
    };
};

const listMapper = (users) => {
    return { users: users.map(_modelMapper) };
}

const modelMapper = (user) => {
    return { user: _modelMapper(user) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
