import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel,{IOrder} from "../models/orderModel";
import { userModel } from "../models/user_model";
import CourseModel from "../models/course_model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { newOrder } from "../services/order.services";


//create order
export const createOrder=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {courseid,payment_info}=req.body as IOrder;
        // console.log(courseid);
        const user=await userModel.findById(req.user?._id);
        const userAlreadyHaveThecourse=user?.courses.some((course:any)=>course._id.toString()===courseid);
 
        if(userAlreadyHaveThecourse){
            return next(new ErrorHandler("You already purchased this course",400))
        }

        const course:any=await CourseModel.findById(courseid);
        // console.log(course);
        if(!course){
            return next(new ErrorHandler("Course not found",404))
        }

        const data:any={
            courseid:course._id,
            userId:user?._id,
            payment_info
        }
        const mailData={
            order:{
                _id:course._id.toString().slice(0,6) ,
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-US',{year:"numeric",month:"long",day:"numeric"})
            }
        }

        const html=await ejs.renderFile(path.join(__dirname,'../mails/purchasedMail.ejs'),{order:mailData});

        try{
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"Course Purchased",
                    template:"purchasedMail.ejs",
                    data:mailData
                });
            }
        } catch(error:any){
            return next(new ErrorHandler(error.message,500))
        }

        user?.courses.push(course?._id);
        await user?.save();

        await NotificationModel.create({
            user:user?._id,
            title:"New order",
            message: `You have a new order for ${course.name}`
        });

        course.purchased+=1;
        await course.save();

        // console.log(data);
        newOrder(data,res,next);

    } catch(error:any){
        next(new ErrorHandler(error.message,500))
    }
})









