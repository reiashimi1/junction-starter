'use strict';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.app.helpers = {
            Auth: require('./auth'),
        }
    }
};
