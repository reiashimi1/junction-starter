const Boom = require('@hapi/boom');
module.exports = {
    create: async (request, h) => {
        const { name } = request.payload;
        const { user } = request.auth.credentials;
        const { id: userId } = user;
        const { Organization } = request.server.app.models;
        const { mapper } = request.pre;

        try {
            const organization = await Organization.create({
                name,
                userId
            })

            return mapper(organization)
        } catch (err) {
            console.log(err);
            return Boom.badImplementation(err);
        }
    },

    getAll: async (request, h) => {
        const { Organization } = request.server.app.models;
        const { user } = request.auth.credentials;
        const { id: userId } = user;
        const { mapper } = request.pre;

        const organizations = await Organization.findAll({
            where: {
                userId
            }
        })

        return mapper(organizations)
    },

    getOne: async (request, h) => {
        const { organization, mapper } = request.pre;
        return mapper(organization);
    },

    delete: async (request, h) => {
        const { organization } = request.pre;
        try {
            await organization.destroy();
            return { message: 'Organization deleted' }
        } catch (err) {
            return Boom.badImplementation(err)
        }
    }
}
