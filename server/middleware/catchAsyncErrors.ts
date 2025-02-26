import { NextFunction, Request, Response } from "express";

export const catchAsyncError=(thefn:any)=>(req:Request,res:Response,next:NextFunction)=>{
    Promise.resolve(thefn(req,res,next)).catch(next);
}