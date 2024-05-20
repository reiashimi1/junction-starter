exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {
        await server.register({
            plugin: require('./user'),
            routes: {
                prefix: '/users'
            },
            options
        });

        await server.register({
            plugin: require('./user/loyaltyProgram'),
            routes: {
                prefix: '/users/loyalty-programs'
            },
            options
        });


        await server.register({
            plugin: require('./external'),
            routes: {
                prefix: '/external'
            },
            options
        });

        await server.register({
            plugin: require('./airline/offers'),
            routes: {
                prefix: '/airline/offers'
            },
            options: options
        });

        await server.register({
            plugin: require('./airline/reward'),
            routes: {
                prefix: '/airline/rewards'
            },
            options: options
        });

        await server.register({
            plugin: require('./airline/roulette'),
            routes: {
                prefix: '/airline/roulette'
            },
            options: options
        });

        await server.register({
            plugin: require('./airline/loyaltyProgram'),
            routes: {
                prefix: '/airline/loyalty-programs'
            },
            options
        });

        await server.register({
            plugin: require('./user/roulette'),
            routes: {
                prefix: '/users/roulette'
            },
            options: options
        });

        await server.register({
            plugin: require('./airline/flight'),
            routes: {
                prefix: '/airline/flights'
            },
            options: options
        });

        await server.register({
            plugin: require('./user/recommendations'),
            routes: {
                prefix: '/users/recommendations'
            },
            options: options
        });
    }
}
