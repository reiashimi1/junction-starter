'use strict';

const _modelMapper = (document) => {
    return {
        id: document.id,
        type: document.type,
        number: document.number,
        nid: document.nid,
        issuingCountry: document.issuingCountry,
        issueDate: document.issueDate,
        expiryDate: document.expiryDate,
    };
};

const listMapper = (documents) => {
    return { documents: documents.map(_modelMapper) };
}

const modelMapper = (document) => {
    return { document: _modelMapper(document) };
};

module.exports = { _modelMapper, listMapper, modelMapper };
