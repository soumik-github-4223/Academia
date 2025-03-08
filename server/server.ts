import {app} from  "./app"; //import app from app.ts
import connectDB from "./utils/db";
require('dotenv').config(); //import dotenv
import {v2 as cloudinary} from "cloudinary"; //import cloudinary

const PORT = process.env.PORT || 3000; //set port

cloudinary.config({ //configure cloudinary
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

//create server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});

