import express, { NextFunction, Request, Response } from 'express'; //import express 
export const app = express(); // create an instance of express
import cors from 'cors'; //import cors
import cookieParser from 'cookie-parser';
require('dotenv').config(); //import dotenv
import { errorMiddleware } from './middleware/error';
import UserRouter from './routes/user_routes';
import courseRouter from './routes/course_routes';
import orderRouter from './routes/order_routes';
import notificationRoute from './routes/notification_routes';
import analyticsRouter from './routes/analytics_routes';


//body parser : 
app.use(express.json({limit: '50mb'}));

//cookie-parser : To set cookies in the browser from backend
app.use(cookieParser());

//cors = Cross origin resource sharing Used for security
//cors helps us to hit the api only from our origin, not from anywhere else
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));


//routes
app.use("/api/v1",UserRouter,courseRouter,orderRouter,notificationRoute,analyticsRouter); //use the routes

//testing api
app.get("/test",(req:Request, res:Response,next:NextFunction)=>{
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})

//unknown routes
app.all("*",(req:Request, res:Response,next:NextFunction)=>{
    const err : any= new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404; //404 is not found status code  
    next(err); // Pass control to the next middleware
}) 


app.use(errorMiddleware); //error handling middleware