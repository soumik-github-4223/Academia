import {app} from  "./app"; //import app from app.ts
import connectDB from "./utils/db";
require('dotenv').config(); //import dotenv

const PORT = process.env.PORT || 3000; //set port

//create server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});

