"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const dbUrl = process.env.DB_URL || '';
// console.log("DB URL is : ",dbUrl);
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(dbUrl, {
            connectTimeoutMS: 30000, // Increase connection timeout
            socketTimeoutMS: 45000, // Increase socket timeout
        }).then((data) => {
            console.log(`Database connected with ${data.connection.host}`);
        });
    }
    catch (error) {
        console.log("Error is : ", error.message);
        setTimeout(connectDB, 5000);
    }
};
exports.default = connectDB;
