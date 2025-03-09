import { Request,Response,NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import { userModel } from "../models/user_model";
import CourseModel from "../models/course_model";
import OrderModel from "../models/orderModel";


//get user analytics for admin onlt
export const getUserAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try{

        const users=await generateLast12MonthsData(userModel);

        res.status(200).json({
            success:true,
            users
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

//get course analytics for admin onlt
export const getCourseAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try{

        const courses=await generateLast12MonthsData(CourseModel);

        res.status(200).json({
            success:true,
            courses
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});

//get order analytics for admin onlt
export const getOrderAnalytics = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    try{

        const orders=await generateLast12MonthsData(OrderModel);

        res.status(200).json({
            success:true,
            orders
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,500));
    }
});









