const Glue = require('@hapi/glue');
const manifestConfig = require('./lib/manifest');

(async () => {
    try {
        const server = await Glue.compose(manifestConfig);;
        await server.start();

        console.log("Server started at", server.info.uri);
    }
    catch (err) {
        console.error('Server crashed', err);
        process.exit(1);
    }

})();
