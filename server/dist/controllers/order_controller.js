"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPayment = exports.sendStripePublishableKey = exports.getAllOrders = exports.createOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const user_model_1 = require("../models/user_model");
const course_model_1 = __importDefault(require("../models/course_model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const order_services_1 = require("../services/order.services");
const redis_1 = require("../utils/redis");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//create order
exports.createOrder = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { courseid, payment_info } = req.body;
        // console.log(courseid);
        // the below fn checks if users entered valid payment details or not, if not then return error to the user.
        if (payment_info) {
            if ("id" in payment_info) {
                const paymentIntentId = payment_info.id;
                const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
                if (paymentIntent.status !== "succeeded") {
                    return next(new ErrorHandler_1.default("Payment not authorized", 400));
                }
            }
        }
        const user = await user_model_1.userModel.findById(req.user?._id);
        const userAlreadyHaveThecourse = user?.courses.some((course) => course._id.toString() === courseid);
        if (userAlreadyHaveThecourse) {
            return next(new ErrorHandler_1.default("You already purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseid);
        // console.log(course);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const data = {
            courseid: course._id,
            userId: user?._id,
            payment_info,
        };
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        };
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/purchasedMail.ejs"), { order: mailData });
        try {
            if (user) {
                await (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Course Purchased",
                    template: "purchasedMail.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 500));
        }
        user?.courses.push(course?._id);
        await redis_1.redis.set(req.user?.id, JSON.stringify(user));
        await user?.save();
        await notificationModel_1.default.create({
            user: user?._id,
            title: "New order",
            message: `You have a new order for ${course.name}`,
        });
        course.purchased += 1;
        await course.save();
        // console.log(data);
        (0, order_services_1.newOrder)(data, res, next);
    }
    catch (error) {
        next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get all orders: for admin
exports.getAllOrders = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, order_services_1.getAllOrdersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// send stripe publishable key
exports.sendStripePublishableKey = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
// new payment
exports.newPayment = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "USD",
            metadata: {
                company: "Academia",
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.status(201).json({
            success: true,
            client_secret: myPayment.client_secret,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
