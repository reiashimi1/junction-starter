'use strict';

module.exports = async (server, options) => {
    const { auth } = options;
    const { User } = server.app.models;

    const validateHeaderFunc = async function (decoded, request, h) {
        try {
            const user = await User.findOne({
                where: {
                    id: decoded.user
                }
            });

            if (!user) {
                return { isValid: false };
            }

            if (user.role === 'airline') {
                await user.reload({ include: 'airline' });
            }

            return {
                isValid: true,
                credentials: { user, scope: user.role }
            };
        }
        catch(err) {
            request.log(['auth'], err, request);
            return { isValid: false };
        }
    };

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('auth', 'jwt', {
        key: Buffer.from(auth.secret, 'base64'),
        validate: validateHeaderFunc,
        verifyOptions: { algorithms: [ 'HS256' ] }
    });
}
