import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/orderModel";


//create new order
export const newOrder=catchAsyncError(async(data:any,res:Response)=>{
    // console.log(data);
    const order=await OrderModel.create(data);
    // console.log(order);
    res.status(201).json({
        success:true,
        message:"Order purchased successfully",
        order
    })
})