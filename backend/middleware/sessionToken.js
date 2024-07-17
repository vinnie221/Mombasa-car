const jwt = require('jsonwebtoken');

async function sessionToken(req, res, next) {
    try {
        const token = req.cookies?.sessionToken || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                message: "Session token is missing",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.SESSION_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: "Invalid session token",
                    error: true,
                    success: false
                });
            }

            req.sessionId = decoded?.sessionId;
            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = sessionToken;
