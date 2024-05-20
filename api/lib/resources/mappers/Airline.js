'use strict';

const _modelMapper = (airline) => {
    return {
        id: airline.id,
        code: airline.code,
        name: airline.name,
    };
};

const listMapper = (airlines) => {
    return { airlines: airlines.map(_modelMapper) };
}

const modelMapper = (airline) => {
    return { airline: _modelMapper(airline) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
