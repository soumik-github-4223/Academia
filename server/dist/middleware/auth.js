"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticated = void 0;
const catchAsyncErrors_1 = require("./catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
require('dotenv').config();
// authenticated user
exports.isAuthenticated = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    // console.log(access_token);
    if (!access_token) {
        return next(new ErrorHandler_1.default('Login first to access this resource', 400));
    }
    const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    // console.log(decoded);
    if (!decoded) {
        return next(new ErrorHandler_1.default('Access token is not valid', 400));
    }
    const user = await redis_1.redis.get(decoded.id);
    // console.log(user);
    if (!user) {
        return next(new ErrorHandler_1.default("Please login first to access this resource", 400));
    }
    req.user = JSON.parse(user);
    next(); // pass the control to the next middleware/controller
});
// validate user role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new ErrorHandler_1.default(`Role: ${req.user?.role} is not allowed to access this resource`, 400));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
