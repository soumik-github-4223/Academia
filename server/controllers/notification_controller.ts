import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";


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