import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const errorMiddleware= (err:any, req:Request, res:Response, next:NextFunction)=>{
    err.statusCode=err.statusCode || 500; // set the statusCode property of the error object to 500 if it is not set
    err.message=err.message || 'Internal Server Error'; // set the message property of the error object to 'Internal Server Error' if it is not set

    //wrong mongodb id error
    if(err.name==='CastError'){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message,404);
    }

    //Duplicate key error:for authentication if same email is used
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message,400);
    }

    //wrong jwt error
    if(err.name==='JsonWebTokenError'){
        const message='Json web token is invalid, try again'
        err=new ErrorHandler(message,400);
    }

    //jwt expire error
    if(err.name==='TokenExpiredError'){
        const message='Json web token is expired, try again'
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}