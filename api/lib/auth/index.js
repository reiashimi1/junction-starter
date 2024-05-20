'use strict';

const Routes = require('./routes');
const Strategies = require('./strategies');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        await Strategies(server, options);
        server.auth.default('auth');

        await Routes(server, options);
    }
};
