import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import cron from 'node-cron';

//get all notifications : only admin can access
export const getNotifications=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const notification=await NotificationModel.find().sort({createdAt:-1});

        res.status(201).json({
            success:true,
            notification
        })
 
    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


// update notification status
export const updateNotification=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{

        const notification=await NotificationModel.findById(req.params.id);

        if(notification){
            notification.status="read";
        }

        await notification?.save();

        const notifications=await NotificationModel.find().sort({createdAt:-1});
        
        res.status(201).json({
            success:true,
            notifications
        })


    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
}) 


// delete read notification after 30 days- for admin
cron.schedule("0 0 0 * * *",async()=>{
    const thiryDayAgo=new Date(Date.now()-30*24*60*60*1000);
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:thiryDayAgo}});
    
})


