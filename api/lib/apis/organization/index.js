'use strict';

const Routes = require('./routes');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        await Routes(server, options);
    }
};
