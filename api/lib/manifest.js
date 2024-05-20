const config = require('../config');

const manifestConfiguration = {
    server: {
        host: config.server.host,
        port: config.server.port,
        app: config,

        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['access-control-allow-origin', 'authorization', 'ngrok-skip-browser-warning']
            },
            validate: {
                failAction: async (request, h, err) => {
                    delete err.output.payload.validation;

                    const hapiValidationErrors = err.details.map(detail => {
                        return {
                            key: detail.context.key,
                            message: detail.message,
                            type: detail.type,
                        };
                    });

                    if (!err.output.payload.errors) {
                        err.output.payload.errors = hapiValidationErrors;
                    } else {
                        Object.assign(err.output.payload.errors, hapiValidationErrors);
                    }
                    throw err;
                },
                options: {
                    abortEarly: false
                }
            }
        },
    },

    register: {
        plugins: [
            {
                plugin: require('./db'),
                options: config.server.db
            },
            {
                plugin: require('./helpers'),
            },
            {
                plugin: require('./auth'),
                options: {
                    auth: config.server.auth
                }
            },
            {
                plugin: require('./middlewares'),
                options: {}
            },
            {
                plugin: require('./apis'),
                options: {}
            },
            {
                plugin: require('./resources'),
                options: {}
            },
            {
                plugin: require('./services'),
                options: {}
            },
            { plugin: '@hapi/inert' },
            { plugin: '@hapi/vision' },
            {
                plugin: 'hapi-swagger',
                options: {
                    info: {
                        title: 'documentation',
                        version: '1.0.0'
                    },
                },
            }
        ]
    }
}

module.exports = manifestConfiguration
