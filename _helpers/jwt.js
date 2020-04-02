const expressJwt = require('express-jwt')
const userService = require('../src/user.service')

module.exports = jwt

function jwt() {
    const secret = process.env.JWT_SECRET

    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/authenticate',
            '/api/v1/register',
            '/api/v1/status'
        ]
    })
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub)

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true)
    }

    done()
}
