import { Request,Response,NextFunction } from "express";
import { userModel,Iuser } from "../models/user_model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
require("dotenv").config();
import ejs from "ejs";

//register user
interface registrationBody{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

export const registerUser= catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password}=req.body;

        const isEmailExists=await userModel.findOne(email);
        if(isEmailExists) return next(new ErrorHandler("Email already exists",400));

        const user:registrationBody={name,email,password};
        const activationToken=createActivationToken(user);

        const activationCode=activationToken.activationCode;
        const data={user:{name:user.name,},activationCode};
        const html=await ejs.renderFile(path.join(__dirname,""))

    }catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
})

interface IactivationToken {
    token:string;
    activationCode:string;
}

export const createActivationToken=(user:any):IactivationToken =>{
    const activationCode=Math.floor(1000 + Math.random() * 9000).toString(); // generate 4 digit code


    const token=jwt.sign({user,activationCode},process.env.ACTIVATION_SECRET as Secret,{expiresIn:"5m"});

    return {token,activationCode};
}




