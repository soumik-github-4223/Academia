import {Request, Response, NextFunction} from 'express';
import { catchAsyncError } from './catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { redis } from '../utils/redis';
require('dotenv').config();
import { Iuser } from '../models/user_model';


// authenticated user
export const isAuthenticated=catchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{

    const access_token=req.cookies.access_token as string;
    // console.log(access_token);

    if(!access_token) {
        return next(new ErrorHandler('Login first to access this resource',400));
    }

    const decoded=jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    // console.log(decoded);

    if(!decoded) {
        return next(new ErrorHandler('Access token is not valid',400));
    }

    const user=await redis.get(decoded.id);
    // console.log(user);

    if(!user){
        return next(new ErrorHandler("Please login first to access this resource",400));
    }

    req.user= JSON.parse(user);

    next(); // pass the control to the next middleware/controller

})



// validate user role
export const authorizeRoles=(...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`,400));
        }

        next();
    }
}

