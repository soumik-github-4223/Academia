"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app"); //import app from app.ts
const socketServer_1 = require("./socketServer");
const db_1 = __importDefault(require("./utils/db"));
require('dotenv').config(); //import dotenv
const cloudinary_1 = require("cloudinary"); //import cloudinary
const http_1 = __importDefault(require("http")); //import http
const PORT = process.env.PORT || 3000; //set port
const server = http_1.default.createServer(app_1.app); //create server
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});
//create server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectDB()
// });
(0, socketServer_1.initSocketServer)(server); //initialize socket server
//for socket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    (0, db_1.default)();
});
