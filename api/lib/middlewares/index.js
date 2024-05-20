const Boom = require("@hapi/boom");

exports.plugin = {
  pkg: require("./package.json"),
  register: async function (server, options) {
    const organization = {
      assign: "organization",
      async method(request, h) {
        const { organizationId } = request.params;
        const { Organization } = server.app.models;
        const { user } = request.auth.credentials;
        const { id: userId } = user;

        const organization = await Organization.findOne({
          where: {
            id: organizationId,
            userId,
          },
        });

        if (!organization) {
          return Boom.notFound("Organization not found");
        }

        return organization;
      },
    };

    server.app.middlewares = {
      organization,
    };
  },
};
