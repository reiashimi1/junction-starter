'use strict';
const Sequelize = require('sequelize');
const Path = require('path');
const Fs = require('fs');
const Associations = require('./associations')

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        const db = options;
        const pgConnString = `postgres://${db.user}:${db.pass}@${db.host}:${db.port}`;

        // const sequelizeTemp = new Sequelize(pgConnString);
        // const [results] = await sequelizeTemp.query(
        //     `SELECT 1 from pg_database WHERE datname='${db.name}'`,
        //     { logging: false }
        // );
        // if (!results.length) {
        //     await sequelizeTemp.query(`CREATE DATABASE "${db.name}"`);
        // }
        // await sequelizeTemp.close();

        // Start the connection with the database
        console.log(pgConnString + `/${db.name}`)
        const sequelize = new Sequelize(
            pgConnString + `/${db.name}`,
            {
                logging: true,
                minifyAliases: true,
            }
        );

        await sequelize.authenticate();

        await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

        console.log('Database connected');

        const models = {};
        const files = Fs.readdirSync(Path.join(__dirname, "./models/"))

        for (const file of files) {
            if (file === 'index.js') continue;
            const name = file.replace('.js', '');
            const model = require(`./models/${name}`);
            models[name] = await model(server, options, sequelize);
        }

        await Associations(models);
        // synchronise the database tables
        await sequelize.sync();

        process.on('exit', function (){
            sequelize.close()
        });

        // expose the database globally to hapi server
        // can be accessed anywhere at server.app.db
        server.app.db = sequelize;
        server.app.models = models;
    }
};
