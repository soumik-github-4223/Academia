import {app} from  "./app"; //import app from app.ts
import { initSocketServer } from "./socketServer";
import connectDB from "./utils/db";
require('dotenv').config(); //import dotenv
import {v2 as cloudinary} from "cloudinary"; //import cloudinary
import http from "http"; //import http

const PORT = process.env.PORT || 3000; //set port

const server = http.createServer(app); //create server

cloudinary.config({ //configure cloudinary
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

//create server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectDB()
// });

initSocketServer(server); //initialize socket server

//for socket server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});
