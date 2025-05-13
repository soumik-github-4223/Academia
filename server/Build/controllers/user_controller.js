"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.updateProfilePic = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registerUser = void 0;
const user_model_1 = require("../models/user_model");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const jwt_1 = require("../utils/jwt");
const redis_1 = require("../utils/redis");
const user_service_1 = require("../services/user.service");
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.registerUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExists = await user_model_1.userModel.findOne({ email });
        if (isEmailExists)
            return next(new ErrorHandler_1.default("Email already exists", 400));
        const user = { name, email, password };
        const activationToken = (0, exports.createActivationToken)(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name, }, activationCode };
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/activationmail.ejs"), data); // custom path to the ejs file for mail template
        try {
            await (0, sendMail_1.default)({
                email: user.email,
                subject: "Account Activation",
                template: "activationmail.ejs",
                data
            });
            res.status(201).json({
                success: true,
                message: `Please check your email ${user.email} to activate your account`,
                activationToken: activationToken.token
            });
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate 4 digit code
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
    return { token, activationCode };
};
exports.createActivationToken = createActivationToken;
exports.activateUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { activation_token, activation_code } = req.body;
        const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler_1.default("Invalid activation code", 400));
        }
        const { name, email, password } = newUser.user;
        const existUser = await user_model_1.userModel.findOne({ email });
        if (existUser) {
            return next(new ErrorHandler_1.default("Email already exists", 400));
        }
        const user = await user_model_1.userModel.create({ name, email, password });
        res.status(201).json({ success: true });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.loginUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler_1.default("Please enter email and password", 400));
        }
        const user = await user_model_1.userModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler_1.default("Invalid email or password", 400));
        }
        (0, jwt_1.sendToken)(user, 200, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// logout user
exports.logoutUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        // delete redis cache
        const userId = req.user?._id;
        // console.log(userId);
        redis_1.redis.del(userId);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//update access token
exports.updateAccessToken = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESH_TOKEN);
        const message = "Please login first.";
        if (!decoded) {
            return next(new ErrorHandler_1.default(message, 400));
        }
        const session = await redis_1.redis.get(decoded.id);
        if (!session) {
            return next(new ErrorHandler_1.default(message, 400));
        }
        const user = JSON.parse(session);
        // make access & refresh token
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: "3d" });
        req.user = user; // set user to reqest
        //update cookie
        // the third parameter is my own way of setting the cookie options, if I don't want to use the default cookie options
        res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, jwt_1.refreshTokenOptions);
        await redis_1.redis.set(user._id, JSON.stringify(user), 'EX', 604800); // set the user to redis for 7 days
        // res.status(200).json({
        //     status:"success",
        //     accessToken
        // }) // no need to send response, just pass the request to next middleware
        next(); // pass the request to next middleware
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//get user info
exports.getUserInfo = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        (0, user_service_1.getUserById)(userId, res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.socialAuth = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { email, name, avatar } = req.body;
        const user = await user_model_1.userModel.findOne({ email });
        if (!user) {
            const newUser = await user_model_1.userModel.create({ email, name, avatar });
            (0, jwt_1.sendToken)(newUser, 200, res);
        }
        else {
            (0, jwt_1.sendToken)(user, 200, res);
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.updateUserInfo = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const userId = req.user?._id; // get from redis
        const user = await user_model_1.userModel.findById(userId); // get from db
        if (email && user) {
            const isEmailExists = await user_model_1.userModel.findOne({ email });
            if (isEmailExists) {
                return next(new ErrorHandler_1.default("Email already exists", 400));
            }
            user.email = email;
        }
        if (name && user) {
            user.name = name;
        }
        await user?.save();
        const setToRedis = await redis_1.redis.set(userId, JSON.stringify(user));
        // console.log(setToRedis);
        res.status(201).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.updatePassword = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await user_model_1.userModel.findById(req.user?._id).select("+password");
        if (user?.password === undefined) {
            return next(new ErrorHandler_1.default("Password modification not possible", 400));
        }
        const isPasswordMatched = await user?.comparePassword(oldPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler_1.default("Old password is incorrect", 400));
        }
        user.password = newPassword;
        await user.save();
        await redis_1.redis.set(req.user?._id, JSON.stringify(user));
        res.status(201).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.updateProfilePic = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { avatar } = req.body;
        const userId = req.user?._id;
        const user = await user_model_1.userModel.findById(userId);
        if (user && avatar) {
            if (user?.avatar.public_id) { // first delete the previous image from cloudinary if it avatar exists
                await cloudinary_1.default.v2.uploader.destroy(user?.avatar?.public_id);
            }
            else {
                const myCloud = await cloudinary_1.default.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150
                });
                user.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                };
            }
        }
        await user?.save();
        await redis_1.redis.set(userId, JSON.stringify(user));
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get all users: for admin
exports.getAllUsers = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, user_service_1.getAllUsersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//update user role
exports.updateUserRole = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id, role } = req.body;
        (0, user_service_1.updateUserRoleService)(res, id, role);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// delete user : for admin access only
exports.deleteUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.userModel.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        await user.deleteOne({ id });
        await redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
