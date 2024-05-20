'use strict';

const ConfigMapManager = require('./classes/ConfigMapManager');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.services = {
            ConfigMapManager,
        };
    }
};
