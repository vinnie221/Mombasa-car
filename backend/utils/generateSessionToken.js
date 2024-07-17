const jwt = require('jsonwebtoken');

function generateSessionToken(sessionId) {
    const payload = { sessionId };
    const token = jwt.sign(payload, process.env.SESSION_SECRET_KEY, { expiresIn: '72h' });
    return token;
}

module.exports = generateSessionToken;
