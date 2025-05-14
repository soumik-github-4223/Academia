"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = exports.newOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const orderModel_1 = __importDefault(require("../models/orderModel"));
//create new order
exports.newOrder = (0, catchAsyncErrors_1.catchAsyncError)(async (data, res) => {
    // console.log(data);
    const order = await orderModel_1.default.create(data);
    // console.log(order);
    res.status(201).json({
        success: true,
        message: "Order purchased successfully",
        order
    });
});
//get all orders
const getAllOrdersService = async (res) => {
    const orders = await orderModel_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        orders
    });
};
exports.getAllOrdersService = getAllOrdersService;
