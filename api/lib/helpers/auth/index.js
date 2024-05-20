'use strict';
const Randtoken = require('rand-token');
const Jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = class Auth {

    constructor(config) {
        this.config = config
    }

    async generateAccessToken({ user, token, authType, jobPositionId, keyId = undefined, dbTransaction }) {
        const refreshToken = Randtoken.generate(256);
        const signedAccessToken = this.signAccessToken({
            jti: token.id,
            user: user.id,
            authType,
            jobPosition: jobPositionId || undefined,
            keyId
        });

        const expiresAt = moment().add(this.config.accessTokenExpiration, 'milliseconds').toDate();

        token.refreshToken = refreshToken;
        const refreshTokenExpiresAt = moment().add(this.config.refreshTokenExpiration, 'seconds').toDate();
        token.expiresAt = refreshTokenExpiresAt;

        await token.save({
            fields: [
                'refreshToken',
                'expiresAt'
            ],
            transaction: dbTransaction,
        });


        return {
            accessToken: signedAccessToken,
            refreshToken: refreshToken,
            expiresIn: this.config.accessTokenExpiration,
            refreshTokenExpiresAt,
            tokenType: 'bearer',
            expiresAt
        }
    }
    signAccessToken(payload, isPermanent = false) {
        return Jwt.sign(payload, Buffer.from(this.config.secret, 'base64'), {
            expiresIn: isPermanent ? 3155692597 : this.config.accessTokenExpiration,
        });
    }

    decodeAccessToken(token) {
        const secretBase64 = Buffer.from(this.config.secret, 'base64');
        try {
            return Jwt.verify(token, secretBase64);
        } catch (err) {
            return null;
        }
    }

    getAccessTokenExpiration() {
        return this.config.accessTokenExpiration
    }

}
