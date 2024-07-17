const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const UAParser = require('ua-parser-js');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const generateSessionToken = require('./utils/generateSessionToken');
const sessionToken = require('./middleware/sessionToken');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Make sure this matches your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Middleware to detect browser and store session
app.use((req, res, next) => {
    const parser = new UAParser();
    const ua = req.headers['user-agent'];
    const browser = parser.setUA(ua).getBrowser().name;

    req.session.browser = browser;

    // Check if session token is already set
    if (!req.cookies.sessionToken) {
        const sessionId = req.sessionID;
        const sessionToken = generateSessionToken(sessionId);

        // Set session token in cookies
        res.cookie('sessionToken', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
    }

    next();
});

app.use("/api", router);

// Use sessionToken middleware for protected routes
app.use('/protected-route', sessionToken, (req, res) => {
    res.status(200).json({
        message: 'Access granted',
        sessionId: req.sessionId,
        success: true,
        error: false
    });
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to db");
        console.log("Server is running");
    });
});
