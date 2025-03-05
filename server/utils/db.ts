import mongoose from "mongoose";
require("dotenv").config();

const dbUrl =process.env.DB_URL || '';
// console.log("DB URL is : ",dbUrl);

const connectDB = async () => {
    try{
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`Database connected with ${data.connection.host}`)   
        })
    } catch(error:any){    
        console.log("Error is : ",error.message);
        setTimeout(connectDB,5000);
    }
}

export default connectDB