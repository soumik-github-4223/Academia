"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express")); //import express 
exports.app = (0, express_1.default)(); // create an instance of express
const cors_1 = __importDefault(require("cors")); //import cors
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('dotenv').config(); //import dotenv
const error_1 = require("./middleware/error");
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const course_routes_1 = __importDefault(require("./routes/course_routes"));
const order_routes_1 = __importDefault(require("./routes/order_routes"));
const notification_routes_1 = __importDefault(require("./routes/notification_routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics_routes"));
const express_rate_limit_1 = require("express-rate-limit");
//body parser : 
exports.app.use(express_1.default.json({ limit: '50mb' }));
//cookie-parser : To set cookies in the browser from backend
exports.app.use((0, cookie_parser_1.default)());
//cors = Cross origin resource sharing Used for security
//cors helps us to hit the api only from our origin, not from anywhere else
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true
}));
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
});
//routes
exports.app.use("/api/v1", user_routes_1.default, course_routes_1.default, order_routes_1.default, notification_routes_1.default, analytics_routes_1.default); //use the routes
//testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    });
});
//unknown routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404; //404 is not found status code  
    next(err); // Pass control to the next middleware
});
exports.app.use(limiter); // Apply the rate limiting middleware to all requests
exports.app.use(error_1.errorMiddleware); //error handling middleware
